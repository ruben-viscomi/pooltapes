import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Hls from 'hls.js';

import { MediaMetadataService } from '../../services/media-metadata/media-metadata.service';
import { IVideo } from '../../models/video.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('player') player: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;

  id: string = '';
  private _video: IVideo = {} as IVideo;

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
    )
  }

  // private createHlsPlayer(): void {
  //   if (Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource(this.getVideoManifest());
  //     hls.attachMedia(this.player.nativeElement);
  //   }
  //   else if (this.player.nativeElement.canPlayType('application/vnd.apple.mpegurl'))
  //     this.player.nativeElement.src = this.getVideoManifest();
  // }

  // private createHlsPlayer(): void {
  //   if (this.player.nativeElement.canPlayType('application/vnd.apple.mpegurl'))
  //     this.player.nativeElement.src = this.getVideoManifest();
  //   if (Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource(this.getVideoManifest());
  //     hls.attachMedia(this.player.nativeElement);
  //   }
  // }

  private createHlsPlayer(): void {
    const hls = new Hls({
      // debug: !environment.production,
      backBufferLength: 90,
      enableWorker: true,
      lowLatencyMode: true
    });
    hls.loadSource(this.getVideoManifest());
    hls.attachMedia(this.player.nativeElement);
    hls.on(Hls.Events.MANIFEST_PARSED, (evnt, data) => {
      console.log(`event [${evnt}]:`, data); // DEBUG: remove in prod
      this.player.nativeElement.play();
    });
  }

  getVideoManifest(): string {
    return 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
    // return `http://${this._video.host}/videos/${this.id}/master.m3u8`;
  }

}
