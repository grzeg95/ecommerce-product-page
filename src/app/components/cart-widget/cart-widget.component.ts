import {DecimalPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {HoverClassesDirective} from '../../directives/hover-class.directive';
import {SvgDirective} from '../../directives/svg.directive';
import {CartService} from '../../services/cart.service';
import {times} from '../../utils/big-number';

@Component({
  selector: 'app-cart-widget',
  standalone: true,
  imports: [
    SvgDirective,
    HoverClassesDirective,
    DecimalPipe
  ],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-cart-widget shadow-lg rounded m-2'
  }
})
export class CartWidgetComponent {

  productsCart = this._cartService.productsCart;
  protected readonly times = times;

  constructor(
    private _cartService: CartService
  ) {
  }

  goToCheckout() {
    this._cartService.closeWidget();
  }

  async removeProduct(id: number) {
    this._cartService.removeProduct(id);
  }
}
