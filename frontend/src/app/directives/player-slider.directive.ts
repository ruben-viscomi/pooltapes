import { Directive, Renderer2, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appPlayerSlider]'
})
export class PlayerSliderDirective implements OnDestroy {

  @Input() maxValue: number = 0;
  @Input() value: number = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  private sliderTrack: HTMLDivElement = {} as HTMLDivElement;
  private sliderProgress: HTMLDivElement = {} as HTMLDivElement;
  private sliderHoverHighlight: HTMLDivElement = {} as HTMLDivElement;
  private sliderThumb: HTMLDivElement = {} as HTMLDivElement;

  private refreshIntervalId: number = -1;

  private get currentPercentage(): number { return (this.value / this.maxValue) * 100 }

  // FLAGS //
  private canHighlight: boolean = true;
  private mouseDown: boolean = false;
  // FLAGS-END //

  constructor(
    private readonly sliderContainer: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.createSliderTrack();
    this.createSliderProgress();
    this.createSliderHoverHighlight();
    this.createSliderThumb();
    this.refreshIntervalId = setInterval(() => this.updateProgress(), 16);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshIntervalId);
  }

  @HostListener('mousedown')
  private mousedownHandler(): void { this.mouseDown = true }

  @HostListener('mouseup')
  private mouseupHandler(): void { this.mouseDown = false }

  @HostListener('click', ['$event'])
  private clickHandler(event: MouseEvent): void {
    this.emitNewValue(event.pageX);
  }

  @HostListener('mouseover', ['$event'])
  private mouseoverHandler(event: MouseEvent): void {
    this.canHighlight = event.target !== this.sliderThumb;
    if (!this.canHighlight) {
      this.renderer.setStyle(this.sliderHoverHighlight, 'width', '0');
      this.renderer.setStyle(this.sliderThumb, 'opacity', '1');
    }
    else this.renderer.setStyle(this.sliderThumb, 'opacity', '0');
  }

  @HostListener('mousemove', ['$event'])
  private mousemoveHandler(event: MouseEvent): void {
    if (this.sliderTrack.contains(<Node>event.target) && this.canHighlight) {
      const percentage: number = (this.normalizePosition(event.pageX) / this.sliderTrack.clientWidth) * 100;
      this.renderer.setStyle(this.sliderHoverHighlight, 'width', `${percentage}%`);
    }
    if (this.mouseDown) this.emitNewValue(event.pageX);
  }

  @HostListener('mouseleave', ['$event'])
  private mouseleaveHandler(event: MouseEvent): void {
    this.renderer.setStyle(this.sliderThumb, 'opacity', '0');
    this.renderer.setStyle(this.sliderHoverHighlight, 'width', '0');
  }

  private emitNewValue(pageX: number): void {
    const decimalPercentage: number = (this.normalizePosition(pageX) / this.sliderTrack.clientWidth);
    this.valueChange.emit(this.maxValue * decimalPercentage);
  }

  private updateProgress(): void {
    this.renderer.setStyle(this.sliderProgress, 'width', `${this.currentPercentage}%`);
    this.renderer.setStyle(this.sliderThumb, 'left', `${this.currentPercentage}%`);
  }

  // TODO:
  private normalizePosition(pageX: number): number { return pageX - this.sliderTrack.offsetLeft }

  private createSliderTrack(): void {
    this.sliderTrack = this.renderer.createElement('div');
    this.renderer.addClass(this.sliderTrack, 'slider-track');
    this.renderer.setStyle(this.sliderTrack, 'width', '100%');
    this.renderer.setStyle(this.sliderTrack, 'position', 'relative');
    this.renderer.appendChild(this.sliderContainer.nativeElement, this.sliderTrack);
  }

  private createSliderProgress(): void {
    this.sliderProgress = this.renderer.createElement('div');
    this.renderer.addClass(this.sliderProgress, 'slider-progress');
    this.renderer.setStyle(this.sliderProgress, 'position', 'absolute');
    this.renderer.setStyle(this.sliderProgress, 'left', '0');
    this.renderer.setStyle(this.sliderProgress, 'bottom', '0');
    this.renderer.setStyle(this.sliderProgress, 'width', '0');
    this.renderer.appendChild(this.sliderTrack, this.sliderProgress);
  }

  private createSliderHoverHighlight(): void {
    this.sliderHoverHighlight = this.renderer.createElement('div');
    this.renderer.addClass(this.sliderHoverHighlight, 'slider-hover-highlight');
    this.renderer.setStyle(this.sliderHoverHighlight, 'position', 'absolute');
    this.renderer.setStyle(this.sliderHoverHighlight, 'left', '0');
    this.renderer.setStyle(this.sliderHoverHighlight, 'bottom', '0');
    this.renderer.setStyle(this.sliderHoverHighlight, 'width', '0');
    this.renderer.appendChild(this.sliderTrack, this.sliderHoverHighlight);
  }

  private createSliderThumb(): void {
    this.sliderThumb = this.renderer.createElement('div');
    this.renderer.addClass(this.sliderThumb, 'slider-thumb');
    this.renderer.setStyle(this.sliderThumb, 'position', 'absolute');
    this.renderer.setStyle(this.sliderThumb, 'left', '0');
    this.renderer.setStyle(this.sliderThumb, 'bottom', '50%');
    this.renderer.setStyle(this.sliderThumb, 'transform', 'translate(-50%, 50%)');
    this.renderer.setStyle(this.sliderThumb, 'opacity', '0');
    this.renderer.appendChild(this.sliderTrack, this.sliderThumb);
  }

}
