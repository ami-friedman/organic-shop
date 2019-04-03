import { ShoppingCartItem, IShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: IShoppingCartItem;
    itemsList: ShoppingCartItem[] = [];

    constructor() {

    }

    getItemQuantity(product: Product) {
        if (!this.items || !this.items[product.key] ) return 0;
        return this.items[product.key].quantity;
    }
  
    get totalQuantity() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let item of this.itemsList) {
            sum += item.totalPrice;
        }
        return sum;
    }

    get productIds() {
        if (!this.items) return null;
        return Object.keys(this.items);
    }
}