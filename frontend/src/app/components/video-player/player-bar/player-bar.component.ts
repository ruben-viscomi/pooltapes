import { Component, OnInit, Input, ElementRef, HostListener, Inject, Renderer2, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MediaPlaylist } from 'hls.js';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent implements OnInit {

  @Input('videoContainer') container: HTMLDivElement = {} as HTMLDivElement;
  @Input('videoElement') video: HTMLVideoElement = {} as HTMLVideoElement;
  @Input() audioTracks: MediaPlaylist[] = [];
  @Input() subTracks: MediaPlaylist[] = [];

  isLanguageMenuHidden: boolean = true;
  isSubsMenuHidden: boolean = true;

  @Output() audioTrackChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() subTrackChange: EventEmitter<number> = new EventEmitter<number>();

  get isFullscreen(): boolean { return this.document.fullscreenElement !== null }
  get paused(): boolean { return this.video.paused }

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  togglePlay(): void {
    if (this.paused)
      return <void>(<unknown>this.video.play());
    this.video.pause();
  }

  toggleFullScreen(): void {
    if (!this.isFullscreen)
      this.container.requestFullscreen()
    else
      this.document.exitFullscreen()
  }

  toggleLanguage(): void {
    this.isLanguageMenuHidden = !this.isLanguageMenuHidden;
    this.isSubsMenuHidden = true;
  }

  toggleSubs(): void {
    this.isSubsMenuHidden = !this.isSubsMenuHidden;
    this.isLanguageMenuHidden = true;
  }

  handleAudioTrackChange(trackId: number): void {
    this.audioTrackChange.emit(trackId);
    this.isLanguageMenuHidden = true;
  }

  handleSubTrackChange(trackId: number): void {
    this.subTrackChange.emit(trackId);
    this.isSubsMenuHidden = true;
  }

  seekVideoTime(newTime: number): void { this.video.fastSeek(newTime) }

  skipVideoTime(time: number): void {
    var totalTime: number = this.video.currentTime + time;
    if (totalTime >= this.video.duration) return this.seekVideoTime(this.video.duration);
    if (totalTime <= 0) return this.seekVideoTime(0);
    this.seekVideoTime(totalTime);
  }

  setVolume(volume: number): void { this.video.volume = volume }

}
