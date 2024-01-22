import {NgStyle} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SwiperContainer} from 'swiper/swiper-element';
import {SwiperOptions} from 'swiper/types';
import {SvgDirective} from '../../directives/svg.directive';
import {SwiperSlideDirective} from '../../directives/swiper-slide.directive';
import {SwiperDirective} from '../../directives/swiper.directive';
import {BreakpointsService} from '../../services/breakpoints.service';

@Component({
  selector: 'app-product-image-gallery',
  standalone: true,
  imports: [
    SvgDirective,
    SwiperDirective,
    SwiperSlideDirective,
    NgStyle
  ],
  templateUrl: './product-image-gallery.component.html',
  styleUrl: './product-image-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-product-image-gallery'
  }
})
export class ProductImageGalleryComponent {

  @Input({required: true}) images!: {normal: string[]; thumb: string[]};

  @ViewChild('appSwiper') protected appSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('appSwiperThumbs') protected appSwiperThumbs!: ElementRef<SwiperContainer>;
  @ViewChild('swiperButtonPrev') protected swiperButtonPrev!: ElementRef<HTMLDivElement>;
  @ViewChild('swiperButtonNext') protected swiperButtonNext!: ElementRef<HTMLDivElement>;

  protected swiperConfig: SwiperOptions = {
    spaceBetween: 10
  }

  protected swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 30,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: false,
    slideToClickedSlide: false
  }

  protected isOnPhone = this._breakpointsService.isOnPhone;

  protected activeIndex = signal(0);

  constructor(
    private _breakpointsService: BreakpointsService
  ) {
  }

  protected handleSlideChange(activeIndex: number) {

    const swiperActiveIndex = activeIndex;
    const swiperThumbsActiveIndex = this.appSwiperThumbs.nativeElement.swiper.activeIndex;
    const slidesPerView = this.swiperThumbsConfig.slidesPerView as number;

    // edge

    const view = (slidesPerView - swiperActiveIndex) + swiperThumbsActiveIndex;

    if (view === 1) {
      this.appSwiperThumbs.nativeElement.swiper.slideNext();
    }

    if (view === slidesPerView) {
      this.appSwiperThumbs.nativeElement.swiper.slidePrev();
    }

    this.activeIndex.set(activeIndex);
  }
}
