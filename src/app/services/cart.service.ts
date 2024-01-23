import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ElementRef, Injectable, signal} from '@angular/core';
import {CartWidgetComponent} from '../components/cart-widget/cart-widget.component';
import {ProductCart} from '../models/product';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _productsCart = signal<ProductCart[]>([]);

  get productsCart() {
    return this._productsCart.asReadonly();
  }

  private _cartWidgetOverlayRef?: OverlayRef;

  private _isCartWidgetShown = signal(false);

  get isCartWidgetShown() {
    return this._isCartWidgetShown.asReadonly();
  }

  constructor(
    private _apiService: ApiService,
    private overlay: Overlay
  ) { }

  async addProduct(id: number, quantity: number) {

    const product = await this._apiService.getProduct(id);

    if (!product || quantity < 0 || quantity > 10) {
      return;
    }

    this._productsCart.update((productsCart) => {

      const productCart = productsCart.find((p) => p.id === product.id);

      if (productCart) {
        productCart.quantity += quantity;

        if (productCart.quantity < 0 || productCart.quantity > 10) {
          productCart.quantity = 10;
        }

      } else {
        productsCart.push({
          id,
          quantity,
          name: product.name,
          image: product.images.thumb[0],
          pricePlan: {...product.pricePlan}
        });
      }

      return productsCart;
    });

    await this.updateCart();
  }

  removeProduct(id: number) {
    this._productsCart.update((productsCart) => {
      return productsCart.filter((p) => p.id !== id);
    });
  }

  async updateCart() {

    const products = (await Promise.all(
      this._productsCart().map((product) => this._apiService.getProduct(product.id))
    ));

    this._productsCart.update((productsCart) => {

      const _productsCart: ProductCart[] = [];

      for (let i = 0; i < products.length; ++i) {

        let product = products[i];

        if (product) {
          _productsCart.push({
            id: productsCart[i].id,
            quantity: productsCart[i].quantity,
            name: product.name,
            image: product.images.thumb[0],
            pricePlan: {...product.pricePlan}
          });
        }
      }

      return _productsCart;
    });
  }

  async openWidget(cartWidgetConnector: Element | ElementRef) {

    this._cartWidgetOverlayRef?.detach();

    const overlayPosition = this.overlay.position().flexibleConnectedTo(cartWidgetConnector).withPositions([
      {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top'}
    ]);

    if (!this._cartWidgetOverlayRef) {
      this._cartWidgetOverlayRef = this.overlay.create({
        positionStrategy: overlayPosition,
        width: '100%',
        maxWidth: '362px'
      });

      this._cartWidgetOverlayRef.outsidePointerEvents().subscribe(() => this.closeWidget());
    }

    this.updateCart();

    const cartWidgetComponentPortal = new ComponentPortal(CartWidgetComponent);
    this._cartWidgetOverlayRef.attach(cartWidgetComponentPortal);
    this._isCartWidgetShown.set(true);
  }

  closeWidget() {
    if (this._cartWidgetOverlayRef) {
      this._cartWidgetOverlayRef.detach();
      setTimeout(() => this._isCartWidgetShown.set(false));
    }
  }
}
