import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, HostListener, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import Hls, { MediaPlaylist } from 'hls.js';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { PlayerService } from '../../services/player.service';
import { IVideo } from '../../models/video.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('playerContainer') container: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  @ViewChild('player') player: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;

  id: string = '';
  private _video: IVideo = {} as IVideo;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService,
    private readonly playerService: PlayerService
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
  }

  ngAfterViewInit(): void {
    this.playerService.setVideo(this.player.nativeElement);
    this.playerService.setPlayer(this.container.nativeElement);
  }

  getVideoManifest(): string {
    return 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
    // return `http://${this._video.host}/videos/${this.id}/master.m3u8`;
  }

}
