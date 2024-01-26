import {NgStyle} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild
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
  @Output() clickNormal = new EventEmitter<void>();

  @ViewChild('appSwiper') protected appSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('appSwiperThumbs') protected appSwiperThumbs!: ElementRef<SwiperContainer>;

  private _firstMove = true;

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

  protected isOnExtraSmallAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'small');
  });

  protected isOnSmallAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'medium');
  });

  protected _activeIndex = signal(0);

  @Input() set activeIndex(activeIndex: number) {

    if (activeIndex === this._activeIndex()) {
      return;
    }

    if (!this._firstMove) {
      this.appSwiper.nativeElement.swiper.slideTo(activeIndex);
    } else {
      this._activeIndex.set(activeIndex);
    }
  }

  @Output() activeIndexChange = new EventEmitter<number>();

  private _activeIndexThumb = 0;

  get activeIndexThumb() {
    return this._activeIndexThumb;
  }

  @Input() set activeIndexThumb(activeIndexThumb: number) {

    if (activeIndexThumb === this._activeIndexThumb) {
      return;
    }

    this._activeIndexThumb = activeIndexThumb;
  }

  @Output() activeIndexThumbChange = new EventEmitter<number>();

  constructor(
    private _breakpointsService: BreakpointsService
  ) {

    effect(() => {

      // thumb edge

      const activeIndex = this._activeIndex();

      if (!this.appSwiperThumbs) {
        return;
      }

      if (this._firstMove) {
        this.appSwiper.nativeElement.swiper.slideTo(activeIndex, 0);
        this.appSwiperThumbs.nativeElement.swiper.slideTo(this.activeIndexThumb, 0);
        this._firstMove = false;
        return;
      }

      const activeIndexThumb = this.activeIndexThumb;
      const slidesPerView = this.swiperThumbsConfig.slidesPerView as number;
      const view = (slidesPerView - activeIndex) + activeIndexThumb;

      if (view <= 1) {
        const newSwiperThumbsActiveIndex = Math.abs(view - 2) + activeIndexThumb;
        this.appSwiperThumbs.nativeElement.swiper.slideTo(newSwiperThumbsActiveIndex);
        this.activeIndexThumb = newSwiperThumbsActiveIndex;
        this.activeIndexThumbChange.emit(newSwiperThumbsActiveIndex);
      }
      if (view >= slidesPerView) {
        let newSwiperThumbsActiveIndex = activeIndexThumb - Math.abs(view - (slidesPerView - 1));
        newSwiperThumbsActiveIndex = newSwiperThumbsActiveIndex < 0 ? 0 : newSwiperThumbsActiveIndex
        this.appSwiperThumbs.nativeElement.swiper.slideTo(newSwiperThumbsActiveIndex);
        this.activeIndexThumb = newSwiperThumbsActiveIndex;
        this.activeIndexThumbChange.emit(newSwiperThumbsActiveIndex);
      }
    });
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

  handleAppSwiperSlideChange(index: number) {

    // first move on effect
    if (this._activeIndex() === index) {
      return;
    }

    this._activeIndex.set(index);
    this.activeIndexChange.emit(index);
  }

  handleSwiperSlideThumbClick(index: number) {
    this.appSwiper.nativeElement.swiper.slideTo(index);
    this.activeIndexChange.emit(index);
  }

  handleSwiperSlideThumbKeydown($event: KeyboardEvent, index: number) {
    if ($event.code === 'Enter') {
      this.appSwiper.nativeElement.swiper.slideTo(index);
      this.activeIndexChange.emit(index);
    }
  }
}
