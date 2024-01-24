import {NgStyle} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SwiperContainer} from 'swiper/swiper-element';
import {SvgDirective} from '../../directives/svg.directive';
import {SwiperSlideDirective} from '../../directives/swiper-slide.directive';
import {SwiperDirective} from '../../directives/swiper.directive';
import {BreakpointsService} from '../../services/breakpoints.service';
import {ProductImageGalleryComponent} from '../product-image-gallery/product-image-gallery.component';

@Component({
  selector: 'app-product-catalog-gallery-fullscreen',
  standalone: true,
  imports: [
    SvgDirective,
    SwiperDirective,
    SwiperSlideDirective,
    NgStyle
  ],
  templateUrl: './product-image-gallery-fullscreen.component.html',
  styleUrl: './product-image-gallery-fullscreen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-product-catalog-gallery-fullscreen app-product-catalog-gallery-fullscreen--hidden'
  }
})
export class ProductImageGalleryFullscreenComponent extends ProductImageGalleryComponent implements AfterViewInit {

  @ViewChild('appSwiper') protected override appSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('appSwiperThumbs') protected override appSwiperThumbs!: ElementRef<SwiperContainer>;

  constructor(
    _breakpointsService: BreakpointsService,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
    super(_breakpointsService);
  }


  ngAfterViewInit() {

    //
    // prevent showing of skipping when activeIndex > 0
    //

    setTimeout(() => {
      this._renderer.removeClass(this._el.nativeElement, 'app-product-catalog-gallery-fullscreen--hidden');
    });
  }
}
