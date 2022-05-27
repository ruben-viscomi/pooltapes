import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import Hls, { MediaPlaylist } from 'hls.js';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { IVideo } from '../../models/video.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('playerContainer') container: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  @ViewChild('player') player: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;

  id: string = '';
  private _video: IVideo = {} as IVideo;
  audioTracks: MediaPlaylist[] = [];
  subTracks: MediaPlaylist[] = [];

  private hls: Hls = {} as Hls;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mediaMetadata: MediaMetadataService
  ) {}

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');

    this.mediaMetadata.requestVideoById(this.id).subscribe(
      (video: IVideo) => {
        this._video = video;
        this.createHlsPlayer();
      },
      () => {}
    );
  }

  private createHlsPlayer(): void {
    this.hls = new Hls({
      // debug: !environment.production,
      backBufferLength: 90,
      enableWorker: true,
      lowLatencyMode: true
    });
    this.hls.loadSource(this.getVideoManifest());
    this.hls.attachMedia(this.player.nativeElement);
    this.hls.on(Hls.Events.MANIFEST_PARSED, (evnt, data) => {
      console.log(`event [${evnt}]:`, data); // DEBUG: remove in prod
      this.audioTracks = data.audioTracks;
      this.subTracks = data.subtitleTracks;
      // this.player.nativeElement.play();
    });
  }

  changeAudioTrack(trackId: number): void {
    this.hls.audioTrack = trackId;
  }

  changeSubTrack(trackId: number): void {
    this.hls.subtitleTrack = trackId;
  }

  getVideoManifest(): string {
    return 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
    // return `http://${this._video.host}/videos/${this.id}/master.m3u8`;
  }

}
