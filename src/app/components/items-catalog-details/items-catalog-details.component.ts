import {NgStyle} from '@angular/common';
import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild} from '@angular/core';
import {SwiperContainer} from 'swiper/swiper-element';
import {SwiperOptions} from 'swiper/types';
import {SvgDirective} from '../../directives/svg.directive';
import {SwiperSlideDirective} from '../../directives/swiper-slide.directive';
import {SwiperDirective} from '../../directives/swiper.directive';
import {BreakpointsService} from '../../services/breakpoints.service';

@Component({
  selector: 'app-items-catalog-details',
  standalone: true,
  imports: [
    SwiperDirective,
    NgStyle,
    SwiperSlideDirective,
    SvgDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './items-catalog-details.component.html',
  styleUrl: './items-catalog-details.component.scss'
})
export class ItemsCatalogDetailsComponent implements AfterViewInit {

  @ViewChild('appSwiper') appSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('appSwiperThumbs') appSwiperThumbs!: ElementRef<SwiperContainer>;

  @ViewChild('swiperButtonPrev') swiperButtonPrev!: ElementRef<HTMLDivElement>;
  @ViewChild('swiperButtonNext') swiperButtonNext!: ElementRef<HTMLDivElement>;

  images = [
    '/assets/images/image-product-1.jpg',
    '/assets/images/image-product-2.jpg',
    '/assets/images/image-product-3.jpg',
    '/assets/images/image-product-4.jpg'
  ];

  swiperConfig: SwiperOptions = {
    spaceBetween: 10
  }

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 30,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: false,
    slideToClickedSlide: false
  }

  isOnPhone = this._breakpointsService.isOnPhone;

  protected activeIndex = signal(0);

  constructor(
    private _breakpointsService: BreakpointsService
  ) {
  }

  ngAfterViewInit() {
  }

  handleSlideChange(activeIndex: number) {

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
