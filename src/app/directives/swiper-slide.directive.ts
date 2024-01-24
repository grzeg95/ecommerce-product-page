import {AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSwiperSlide]',
  standalone: true
})
export class SwiperSlideDirective implements AfterViewInit, OnDestroy {

  private _observer!: MutationObserver;

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {

    this._observer = new MutationObserver((mutationList) => {

      const mutationRecord = mutationList[0];

      if (mutationRecord) {
        this._renderer.setStyle(mutationRecord.target, 'height', (mutationRecord.target as HTMLDivElement).style.width);
      }
    });

    this._observer.observe(this._el.nativeElement, {
      attributes: true,
      attributeFilter: ['style']
    });
  }

  ngOnDestroy() {
    this._observer.disconnect();
  }
}
