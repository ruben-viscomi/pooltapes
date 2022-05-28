import { Directive, ElementRef, Input, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHideableBar]'
})
export class HideableBarDirective {

  @Input('appHideableBar') transitionDuration = 500;
  @Input() timeoutDelay: number = 3000;

  private timeoutId: number = -1;

  @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly bar: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.renderer.setStyle(this.bar.nativeElement, 'transition', `transform ${this.transitionDuration}ms`);
  }

  @HostListener('document:mousemove', ['$event'])
  private globalMouseMoveHandler(event: MouseEvent): void {
    this.clearHiddenTimeout();
    if (event.target === this.bar.nativeElement ||
        this.bar.nativeElement.contains(event.target)) return;
    this.setTimeoutUntilHidden();
  }

  private setTimeoutUntilHidden(): void {
    this.timeoutId = setTimeout(
      () => this.setHidden(),
      this.timeoutDelay
    );
  }

  private clearHiddenTimeout(): void {
    this.setVisible();
    clearTimeout(this.timeoutId);
  }

  private setHidden(): void {
    this.renderer.setStyle(this.bar.nativeElement, 'transform', 'translateY(100%)');
    this.visibilityChange.emit(false);
  }

  private setVisible(): void {
    this.renderer.removeStyle(this.bar.nativeElement, 'transform');
    this.visibilityChange.emit(true);
  }

}
