import { Injectable, Inject, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import Hls, { MediaPlaylist } from 'hls.js';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _video: HTMLVideoElement = {} as HTMLVideoElement;
  private _player: HTMLElement = {} as HTMLElement; // must contain _video and player-bar

  private _lastVolume: number = -1;

  private _hls: Hls;

  audioTracks: MediaPlaylist[] = [];
  selectedAudioTrackId: number = 0;

  subtitleTracks: MediaPlaylist[] = [];
  selectedSubtitleTrackId: number = 0;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this._hls = new Hls({
      // debug: !environment.production,
      backBufferLength: 90,
      enableWorker: true,
      lowLatencyMode: true
    });
  }

  setVideo(video: HTMLVideoElement): void {
    this._video = video;
    this._lastVolume = this._video.volume;
  }

  setPlayer(player: HTMLElement): void { this._player = player }



  // NOTE: 'play/pause' section //

  togglePlay(): void {
    if (this.isPaused()) return this.play();
    this.pause();
  }

  play(): void { this._video.play() }
  pause(): void { this._video.pause() }
  isPaused(): boolean { return (this._video.paused !== undefined) ? this._video.paused : true }



  // NOTE: 'fullscreen' section //

  toggleFullScreen(): void {
    if (this.isFullscreen()) return this.exitFullscreen();
    this.enterFullscreen();
  }

  isFullscreen(): boolean { return this.document.fullscreenElement !== null }
  enterFullscreen(): void { this._player.requestFullscreen() }
  exitFullscreen(): void { this.document.exitFullscreen() }



  // NOTE: 'video progress' section //

  skip(amount: number): void { this.seek(this.currentTime() + amount) }

  seek(time: number): void {
    if (time < 0) return this.seek(0);
    if (time > this.duration()) return this.seek(this.duration());
    this._video.currentTime = time;
  }

  currentTime(): number { return this._video.currentTime }
  duration(): number { return this._video.duration }



  // NOTE: 'volume' section //

  setVolume(value: number): void {
    if (value < 0) return this.setVolume(0);
    if (value > 1) return this.setVolume(1);
    this._video.volume = value;
    if (this.hasVolume()) this._lastVolume = this._video.volume;
  }

  changeVolumeBy(amount: number): void { this.setVolume(this._video.volume + amount) }

  toggleMute(): void {
    if (this.hasVolume()) return this.setVolume(0);
    this.setVolume(this._lastVolume);
  }

  private hasVolume(): boolean { return !!this._video.volume }
  getVolume(): number { return (this._video.volume !== undefined) ? this._video.volume : 1 }


  // NOTE: 'hls' section //

  loadVideo(videoManifest: string): void {
    this._hls.loadSource(videoManifest);
    this._hls.attachMedia(this._video);
    this.listenToHlsEvents();
  }


  // NOTE: 'hls events' section → hls //

  private listenToHlsEvents(): void {
    this._hls.on(Hls.Events.MANIFEST_PARSED, (event: string, data: any) => this.manifestParsedHandler(event, data));
  }

  private manifestParsedHandler(event: string, data: any): void {
    console.log(`event [${event}]:`, data); // DEBUG: remove in prod
    this.audioTracks = data.audioTracks;
    this.subtitleTracks = data.subtitleTracks;
  }


  // NOTE: 'hls audio/subs tracks selection' section → hls //

  changeAudioTrack(trackId: number): void {
    this._hls.audioTrack = trackId
    this.selectedAudioTrackId = this._hls.audioTrack;
  }
  changeSubtitleTrack(trackId: number): void {
    this._hls.subtitleTrack = trackId;
    this.selectedSubtitleTrackId = this._hls.subtitleTrack;
  }

  getSelectedAudioTrack(): MediaPlaylist {
    return <MediaPlaylist>this.audioTracks.find((audioTrack: MediaPlaylist) => audioTrack.id === this.selectedAudioTrackId);
  }

  getSelectedSubtitleTrack(): MediaPlaylist {
    return <MediaPlaylist>this.subtitleTracks.find((subtitleTrack: MediaPlaylist) => subtitleTrack.id === this.selectedSubtitleTrackId);
  }

}
