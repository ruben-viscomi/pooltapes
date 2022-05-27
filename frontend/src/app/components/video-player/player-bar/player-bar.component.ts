import { Component, OnInit, Input, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent implements OnInit {

  @Input('videoContainer') container: HTMLDivElement = {} as HTMLDivElement;
  @Input('videoElement') video: HTMLVideoElement = {} as HTMLVideoElement;

  private hideTimeoutId: number;

  isPlayerBarHidden: boolean = false;
  get isFullscreen(): boolean { return this.document.fullscreenElement !== null }
  get paused(): boolean { return this.video.paused }

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2
  ) {
    this.hideTimeoutId = setTimeout(() => this.isPlayerBarHidden = true, 3500);
  }

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

  seekVideoTime(newTime: number): void { this.video.fastSeek(newTime) }

  skipVideoTime(time: number): void {
    var totalTime: number = this.video.currentTime + time;
    if (totalTime >= this.video.duration) return this.seekVideoTime(this.video.duration);
    if (totalTime <= 0) return this.seekVideoTime(0);
    this.seekVideoTime(totalTime);
  }

  setVolume(volume: number): void { this.video.volume = volume }

}
