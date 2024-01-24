import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {DecimalPipe, NgStyle} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SwiperContainer} from 'swiper/swiper-element';
import {HoverClassesDirective} from '../../directives/hover-class.directive';
import {SvgDirective} from '../../directives/svg.directive';
import {SwiperSlideDirective} from '../../directives/swiper-slide.directive';
import {SwiperDirective} from '../../directives/swiper.directive';
import {Product} from '../../models/product';
import {ApiService} from '../../services/api.service';
import {BreakpointsService} from '../../services/breakpoints.service';
import {CartService} from '../../services/cart.service';
import {div, times} from '../../utils/big-number';
import {
  ProductImageGalleryFullscreenComponent
} from '../product-catalog-gallery-fullscreen/product-image-gallery-fullscreen.component';
import {ProductImageGalleryComponent} from '../product-image-gallery/product-image-gallery.component';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'app-items-catalog-details',
  standalone: true,
  imports: [
    SwiperDirective,
    NgStyle,
    SwiperSlideDirective,
    SvgDirective,
    ProductImageGalleryComponent,
    HoverClassesDirective,
    SpinnerComponent,
    FormsModule,
    DecimalPipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './items-catalog-details.component.html',
  styleUrl: './items-catalog-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-items-catalog-details d-block mt-0 mb-4 mt-sm-4 mt-lg-5 mb-lg-5'
  }
})
export class ItemsCatalogDetailsComponent implements OnInit {

  @ViewChild('appProductImageGallery', {static: false}) appProductImageGallery?: ElementRef<SwiperContainer>;

  protected product: Product | null = null;
  protected readonly times = times;
  protected readonly div = div;

  quantity = '1';

  protected isOnSmallAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'medium');
  });

  protected isOnExtraSmallAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'small');
  });

  protected galleryActiveIndex = 0;
  private itemsCatalogGalleryFullscreenComponentDialogRef?: DialogRef<unknown, ProductImageGalleryFullscreenComponent>;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _apiService: ApiService,
    private _cartService: CartService,
    private _breakpointsService: BreakpointsService,
    private _dialog: Dialog
  ) {

    effect(() => {

      const isOnSmallAndBellow = this.isOnSmallAndBellow();

      if (isOnSmallAndBellow) {
        this.itemsCatalogGalleryFullscreenComponentDialogRef?.close();
      }

    });
  }

  async ngOnInit() {
    this.product = await this._apiService.getProduct(1);
    this._cdr.detectChanges();
  }

  showFullscreenGallery() {

    this.itemsCatalogGalleryFullscreenComponentDialogRef = this._dialog.open(
      ProductImageGalleryFullscreenComponent,
      {
        maxWidth: '545px'
      }
    );

    const componentInstance = this.itemsCatalogGalleryFullscreenComponentDialogRef.componentInstance!;

    componentInstance.images = this.product!.images;
    componentInstance.activeIndex = this.galleryActiveIndex;
  }

  protected addProduct() {
    this._cartService.addProduct(this.product!.id, parseInt(this.quantity));
  }
}
