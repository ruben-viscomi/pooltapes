import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPlayable]'
})
export class PlayableDirective {

  private readonly SPACEBAR: number = 32;

  @Input('appPlayable') videoElement: HTMLVideoElement = {} as HTMLVideoElement;

  constructor(private readonly element: ElementRef) {}

  @HostListener('click', ['$event'])
  private clickHandler(event: Event): void {
    if (event.target !== this.element.nativeElement) return;
    this.playVideo()
  }

  @HostListener('document:keydown', ['$event'])
  private keydownHandler(event: KeyboardEvent): void {
    if (event.keyCode === this.SPACEBAR) return this.playVideo();
  }

  private playVideo(): void {
    if (this.videoElement.paused)
      return <void>(<unknown>this.videoElement.play());
    this.videoElement.pause();
  }

}
