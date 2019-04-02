import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartId;
  items: [] = [];

  private CART_ID_KEY = 'cartId';
  private CART_PATH = '/shopping-carts/';
  private ITEMS_PATH = '/items/';

  constructor(private db: AngularFireDatabase) {}

  private initCartId() {
    this.cartId = localStorage.getItem(this.CART_ID_KEY);
    if (!this.cartId) {
      this.createCart();
    }
    localStorage.setItem(this.CART_ID_KEY, this.cartId);

  }

  private createCart() {
    this.cartId = this.db.list(this.CART_PATH)
    .push({
      datetime: new Date().getTime(),
    })
    .key;
  }

  private getItemRef(productId) {
    return this.db.object(this.CART_PATH + this.cartId + this.ITEMS_PATH + productId);
  }

  private updateCart(product: Product) {
    const itemRef = this.getItemRef(product.key);
    itemRef.valueChanges().pipe(take(1))
    .subscribe( (item:any) => {
      itemRef.update({
        product,
        quantity: (item? item.quantity : 0) + 1,
      })
    })
  }

  getCartObseravle() {
    return this.db.list(this.CART_PATH + this.cartId).valueChanges();
  }

  addToCart(product: Product){
    this.initCartId();
    this.updateCart(product);
  }
}

