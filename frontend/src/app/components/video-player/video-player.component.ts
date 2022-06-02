import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject, HostListener, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import Hls, { MediaPlaylist } from 'hls.js';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { MediaService } from '../../services/media.service';
import { PlayerService } from '../../services/player.service';
import { ViewsService } from '../../services/views.service';

import { IVideo } from '../../models/video.interface';
import { IView } from '../../models/view.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('playerContainer') container: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  @ViewChild('player') player: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;

  id: string = '';
  private _video: IVideo = {} as IVideo;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly mediaService: MediaService,
    private readonly playerService: PlayerService,
    private readonly viewsService: ViewsService
  ) {}

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');

    this.mediaMetadata.requestVideoById(this.id).subscribe(
      (video: IVideo) => {
        this._video = video;
        this.playerService.loadVideo(this.getVideoManifest());
      },
      () => {}
    );

    this.viewsService.requestViewByVideo(this.id).subscribe(
      (view: IView) => {
        if (view.watchTimeMarker >= this._video.endMarker)
          return this.playerService.seek(0);
        this.playerService.seek(view.watchTimeMarker)
      },
      () => this.playerService.seek(0)
    );
  }

  ngAfterViewInit(): void {
    this.playerService.setVideo(this.player.nativeElement);
    this.playerService.setPlayer(this.container.nativeElement);
  }

  ngOnDestroy(): void {
    this.viewsService.endView(
      this.mediaService.media._id,
      this._video._id,
      this.playerService.currentTime()
    ).subscribe(
      () => console.log('view successfully updated'),
      (err: any) => console.log(err)
    );
  }

  getVideoManifest(): string {
    return 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
    // return `http://${this._video.host}/videos/${this.id}/master.m3u8`;
  }

}
