import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appFullscreenable]'
})
export class FullscreenableDirective {

  constructor(
    private readonly element: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  @HostListener('dblclick', ['$event'])
  private toggleFullScreen(event: Event): void {
    if (event.target !== this.element.nativeElement) return;
    if (document.fullscreenElement !== null)
      return <void>(<unknown>this.document.exitFullscreen());
    this.element.nativeElement.requestFullscreen();
  }


}
