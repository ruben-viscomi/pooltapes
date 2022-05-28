import { Directive, HostListener, ElementRef, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appFullscreenable]'
})
export class FullscreenableDirective {

  @Input('appFullscreenable') elementToFullscreen: HTMLElement = {} as HTMLElement;

  constructor(
    private readonly element: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  @HostListener('dblclick', ['$event'])
  private toggleFullScreen(event: MouseEvent): void {
    if (event.target !== this.element.nativeElement) return;
    if (document.fullscreenElement !== null)
      return <void>(<unknown>this.document.exitFullscreen());
    this.elementToFullscreen.requestFullscreen();
  }


}
