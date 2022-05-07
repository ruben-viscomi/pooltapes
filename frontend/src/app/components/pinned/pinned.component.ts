import { Component, AfterContentInit, Input, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import { MiniDetailComponent } from './mini-detail/mini-detail.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements AfterContentInit {

  @Input() pinned: any[] = []; // TODO: replace 'any' with 'IMovie[] | ISeries[]'
  @ViewChild('carousel') carouselRef: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;
  private selected: number = 0;

  constructor(
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngAfterContentInit(): void {}

  onPrevious(): void {
    this.selected = this.wrapAround(this.selected - 1);
    this.updateTransition();
  }

  onNext(): void {
    this.selected = this.wrapAround(this.selected + 1);
    this.updateTransition();
  }

  private updateTransition(): void {
    this.renderer.setStyle(
      this.carouselRef.nativeElement,
      'transition',
      `transform .2s`
    );
    this.renderer.setStyle(
      this.carouselRef.nativeElement,
      'transform',
      `translateX(${-this.getMiniDetailWidth() * this.selected}px)`
    );
  }

  private wrapAround(index: number): number {
    return index - Math.floor(index / this.pinned.length) * this.pinned.length;
  }

  private getMiniDetailWidth(): number {
    return Math.trunc(this.document.documentElement.clientWidth);
  }

  haveMultiplePins(): boolean {
    return this.pinned.length > 1;
  }

}
