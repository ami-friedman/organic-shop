import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new ShoppingCart();

  private CART_ID_KEY = 'cartId';
  private CART_PATH = '/shopping-carts/';
  private ITEMS_PATH = '/items/';

  constructor(private db: AngularFireDatabase) {
    this.initCartFromLocalStorage();

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

  clearCart() {
    this.initCartFromLocalStorage();
    this.db.object(this.CART_PATH + this.cartId + this.ITEMS_PATH).remove();
  }

  private initCartFromLocalStorage() {
    if (this.cartId) {
      this.db.object(this.CART_PATH + this.cartId).valueChanges()
        .subscribe((cart: ShoppingCart) => {
          this.cart.items = cart.items;
          this.reCreateItemList();
        });
    }
  }

  private reCreateItemList() {
    this.cart.itemsList = [];
    for (let productId in this.cart.items) {
      const item = new ShoppingCartItem(this.cart.items[productId].product, this.cart.items[productId].quantity);
      this.cart.itemsList.push(item);
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
        const quantity = (item ? item.quantity : 0) + change;
        if (quantity === 0 ) itemRef.remove();
        else
        itemRef.update({
          product,
          quantity,
        })
      })
  }

  

}

