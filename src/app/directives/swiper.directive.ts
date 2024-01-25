import {AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {SwiperContainer} from 'swiper/swiper-element';
import {SwiperOptions} from 'swiper/types';

register();

@Directive({
  selector: '[appSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {

  private static _id = 0;
  @HostBinding('id') id = 'appSwiper_' + SwiperDirective._id++;

  @Input({required: true}) config!: SwiperOptions;
  @Input() padding = 0;

  @Input() set hidden (hidden: boolean) {
    this._display = hidden ? 'none' : 'block';
  }

  @HostBinding('style.display') _display = 'block';

  @Output() slideChange = new EventEmitter<number>();

  constructor(
    private _el: ElementRef<SwiperContainer>
  ) {
  }

  ngAfterViewInit(): void {
    Object.assign(this._el.nativeElement, this.config);
    this._el.nativeElement.initialize();
    this._el.nativeElement.addEventListener('swiperslidechange', (evt) => {
      this.slideChange.emit((evt as CustomEvent).detail[0].activeIndex);
    });

    const shadowRoot = this._el.nativeElement.shadowRoot;
    const swiper = shadowRoot?.querySelector('.swiper') as HTMLElement;

    swiper.style.padding = `${this.padding}px`;
    swiper.style.width = `calc(100% - ${this.padding * 2}px)`;
  }
}
``
