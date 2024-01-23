import {NgClass} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
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
    class: 'app-nav d-block mx-auto mw'
  },
  animations: [
    slideInOutFromLeft,
    fadeInOut
  ]
})
export class NavComponent {

  isAsideShown = signal<boolean>(false);

  isOnMediumAndBellow = computed(() => {
    const currentScreenSizes = this._breakpointsService.currentScreenSizes();
    return !currentScreenSizes.find((currentScreenSize) => currentScreenSize === 'large');
  });

  cartItemsLength = computed(() => {
    return this._cartService.productsCart().reduce((value, product) => value + product.quantity, 0);
  });

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
    private _cartService: CartService
  ) {
  }
}
