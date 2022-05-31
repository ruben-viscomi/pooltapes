import { Directive, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appToggleableMenu]'
})
export class ToggleableMenuDirective {

  @Input('appToggleableMenu') toggleButton: HTMLElement = {} as HTMLElement;
  @Input() isVisible: boolean = false;

  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private parent: ElementRef) {
    this.toggleChange.subscribe(
      (isVisible: boolean) => this.isVisible = isVisible
    );
  }

  @HostListener('document:click', ['$event'])
  documentClickHandler(event: MouseEvent): void {
    if (!this.parent.nativeElement.contains(<Node>event.target))
      return this.toggleChange.emit(false);

    if (event.target === this.toggleButton)
      return this.toggleChange.emit(!this.isVisible);
  }

}
