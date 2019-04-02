import { CartService } from '../services/cart.service';

export class ShoppingCart {
    items;

    constructor() {

    }
  
    get totalQuantity() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    get productIds() {
        if (!this.items) return null;
        return Object.keys(this.items);
    }
}