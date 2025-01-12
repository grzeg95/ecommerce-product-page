import {DOCUMENT, NgClass} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener, Inject,
  Renderer2,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {noop} from 'rxjs';
import {fadeInOut} from '../../animations/fade-in-out';
import {slideInOutFromLeft} from '../../animations/slide-in-out-from-left';
import {HoverClassesDirective} from '../../directives/hover-class.directive';
import {SvgDirective} from '../../directives/svg.directive';
import {BreakpointsService} from '../../services/breakpoints.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgClass,
    SvgDirective,
    RouterLink,
    HoverClassesDirective,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-nav d-block mx-auto mw z-3 w-100'
  },
  animations: [
    slideInOutFromLeft,
    fadeInOut
  ]
})
export class NavComponent implements AfterViewInit {

  @ViewChild('navWrapper') navWrapper?: ElementRef<HTMLElement>;
  @ViewChild('spacer') spacer?: ElementRef<HTMLElement>;
  @ViewChild('cartWidgetConnector') cartWidgetConnector?: ElementRef<HTMLElement>;

  @HostListener('window:resize')
  private _handleWindowResize() {

    //
    // Add time for browser features
    //

    setTimeout(() => {
      this._updateSpacer();
      this._updateNavWrapperWidth();
    }, 100);
  }

  isAsideShown = signal<boolean>(false);

  isOnMediumAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'large');
  });

  cartItemsLength = computed(() => {
    return this._cartService.productsCart().reduce((value, product) => value + product.quantity, 0);
  });

  isCartWidgetShown = this._cartService.isCartWidgetShown;

  links = [
    {
      link: '/collections',
      title: 'Collections'
    },
    {
      link: '/men',
      title: 'Men'
    },
    {
      link: '/women',
      title: 'Women'
    },
    {
      link: '/about',
      title: 'About'
    },
    {
      link: '/contact',
      title: 'Contact'
    }
  ];

  constructor(
    private _breakpointsService: BreakpointsService,
    private _cartService: CartService,
    private _renderer: Renderer2,
    private _el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngAfterViewInit(): void {
    this._updateSpacer();
    setTimeout(() => setTimeout(() => this._updateNavWrapperWidth()));
  }

  private _updateNavWrapperWidth() {
    this._renderer.setStyle(this.navWrapper?.nativeElement, 'width', `${this._el.nativeElement.clientWidth}px`);
  }

  private _updateSpacer() {
    this._renderer.setStyle(this.spacer?.nativeElement, 'height', `${this.navWrapper?.nativeElement.offsetHeight}px`);
  }

  openCartWidget(cartWidgetConnector: Element) {

    if (!this.isCartWidgetShown()) {
      this._cartService.openWidget(cartWidgetConnector);
    }
  }

  handleCartKeydown($event: KeyboardEvent) {

    if ($event.code === 'Enter') {

      if (this.isCartWidgetShown()) {
        this._cartService.closeWidget();
      } else {
        this.openCartWidget(this.cartWidgetConnector!.nativeElement!);
      }
    }
  }

  handleAsideMenuKeydown($event: KeyboardEvent) {

    if ($event.code === 'Enter') {
      this.isAsideShown.set(true);
      ((document.activeElement) as any)?.blur();
    }
  }

  handleKeydownCloseAside($event: KeyboardEvent) {
    if ($event.code === 'Enter') {
      this.isAsideShown.set(false);
    }
  }

  protected readonly noop = noop;
}
