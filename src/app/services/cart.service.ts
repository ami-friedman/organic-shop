import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  items;

  private CART_ID_KEY = 'cartId';
  private CART_PATH = '/shopping-carts/';
  private ITEMS_PATH = '/items/';

  constructor(private db: AngularFireDatabase) {
    this.initCartFromLocalStorage();

  }

  private initCartFromLocalStorage() {
    if (this.cartId) {
      this.db.object(this.CART_PATH + this.cartId).valueChanges()
        .subscribe((cart: any) => this.items = cart.items);
    }
  }

  private get cartId() {
    return localStorage.getItem(this.CART_ID_KEY);
  }

  private createCartAndSetLocalStorage() {
    const cartId = this.db.list(this.CART_PATH)
      .push({
        datetime: new Date().getTime(),
      })
      .key;
    localStorage.setItem(this.CART_ID_KEY, cartId);
    this.initCartFromLocalStorage();
  }

  private getItemRef(productId) {
    return this.db.object(this.CART_PATH + this.cartId + this.ITEMS_PATH + productId);
  }

  private updateCart(product: Product, change:number) {
    const itemRef = this.getItemRef(product.key);
    itemRef.valueChanges().pipe(take(1))
      .subscribe((item: any) => {
        itemRef.update({
          product,
          quantity: (item ? item.quantity : 0) + change,
        })
      })
  }

  addToCart(product: Product) {
    if (!this.cartId) {
      this.createCartAndSetLocalStorage();
    }
    this.updateCart(product, 1);
  }

  removeFromCart(product: Product) {
    if (!this.cartId) {
      this.createCartAndSetLocalStorage();
    }
    this.updateCart(product, -1);
  }

}

