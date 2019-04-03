import { Product } from './product';

export interface IShoppingCartItem { [key:string]:ShoppingCartItem };

export class ShoppingCartItem {
  
    constructor(public product: Product, public quantity: number) {
    }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}