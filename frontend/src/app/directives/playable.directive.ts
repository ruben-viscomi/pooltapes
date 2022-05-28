import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPlayable]'
})
export class PlayableDirective {

  @Input('appPlayable') videoElement: HTMLVideoElement = {} as HTMLVideoElement;

  constructor(private readonly element: ElementRef) {}

  @HostListener('click', ['$event'])
  private clickHandler(event: MouseEvent): void {
    if (event.target !== this.element.nativeElement) return;
    this.playVideo()
  }

  @HostListener('document:keydown', ['$event'])
  private keydownHandler(event: KeyboardEvent): void {
    if (event.code === 'Space') return this.playVideo();
    if (event.code === 'ArrowLeft') return this.skipVideoTime(-10);
    if (event.code === 'ArrowRight') return this.skipVideoTime(10);
    if (event.code === 'ArrowUp') return this.changeVolume(.1);
    if (event.code === 'ArrowDown') return this.changeVolume(-.1);
  }

  @HostListener('document:wheel', ['$event'])
  private wheelHandler(event: WheelEvent): void { this.changeVolume(-event.deltaY / 1000) }

  private changeVolume(amount: number): void {
    const newVolume: number = this.videoElement.volume + amount;
    if (newVolume >= 1) return this.setVolume(1);
    if (newVolume <= 0) return this.setVolume(0);
    this.setVolume(newVolume);
  }

  private setVolume(volume: number): void { this.videoElement.volume = volume }

  private playVideo(): void {
    if (this.videoElement.paused)
      return <void>(<unknown>this.videoElement.play());
    this.videoElement.pause();
  }

  private skipVideoTime(time: number): void {
    var totalTime: number = this.videoElement.currentTime + time;
    if (totalTime >= this.videoElement.duration) return this.seekVideoTime(this.videoElement.duration);
    if (totalTime <= 0) return this.seekVideoTime(0);
    this.seekVideoTime(totalTime);
  }

  private seekVideoTime(time: number): void { this.videoElement.currentTime = time }

}
