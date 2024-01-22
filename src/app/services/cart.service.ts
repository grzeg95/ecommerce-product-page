import {Injectable, signal} from '@angular/core';
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

  constructor(
    private _apiService: ApiService
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
      return productsCart.filter((p) => p.id === id);
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
}
