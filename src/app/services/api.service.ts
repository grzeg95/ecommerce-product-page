import { Injectable } from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  products: Product[] = [
    {
      id: 1,
      company: 'SNEAKER COMPANY',
      name: 'Fall Limited Edition Sneakers',
      description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
      pricePlan: {
        price: 125.00,
        discount: 50
      },
      images: {
        normal: [
          '/assets/images/image-product-1.jpg',
          '/assets/images/image-product-2.jpg',
          '/assets/images/image-product-3.jpg',
          '/assets/images/image-product-4.jpg'
        ],
        thumb: [
          '/assets/images/image-product-1-thumbnail.jpg',
          '/assets/images/image-product-2-thumbnail.jpg',
          '/assets/images/image-product-3-thumbnail.jpg',
          '/assets/images/image-product-4-thumbnail.jpg'
        ]
      }
    }
  ]

  constructor() { }

  getProduct(id: number) {
    return new Promise<Product | null>((resolve) => {
      resolve(this.products.find((product) => product.id === id) || null);
    });
  }
}
