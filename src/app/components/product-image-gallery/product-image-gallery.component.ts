import {NgStyle} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Input,
  Output,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageGalleryComponent {

  @Input({required: true}) images!: {normal: string[]; thumb: string[]};
  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() clickNormal = new EventEmitter<void>();
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
  protected isOnSmallAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'medium');
  });

  protected isOnExtraSmallAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'small');
  });

  constructor(
    private _breakpointsService: BreakpointsService
  ) {
  }

  protected _activeIndex = signal(0);

  @Input() set activeIndex(activeIndex: number) {
    setTimeout(() => {
      this.appSwiper.nativeElement.swiper.slideTo(activeIndex, 0);
      this.appSwiperThumbs.nativeElement.swiper.slideTo(activeIndex, 0);
      this._activeIndex.set(activeIndex);
    });
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

    this._activeIndex.set(activeIndex);
    this.activeIndexChange.emit(activeIndex);
  }

  handleKeydownOnSwiperButtonPrev($event: KeyboardEvent) {
    if ($event.code === 'Enter') {
      this.appSwiper.nativeElement.swiper.slidePrev();
    }
  }

  handleKeydownOnSwiperButtonNext($event: KeyboardEvent) {
    if ($event.code === 'Enter') {
      this.appSwiper.nativeElement.swiper.slideNext();
    }
  }
}
