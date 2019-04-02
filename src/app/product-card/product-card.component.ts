import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product;
  @Input('show-action') showAction = true;


  constructor(private cartService: CartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.cartService.items) return 0;

    return this.cartService.items[this.product.key] ? this.cartService.items[this.product.key].quantity : 0;
   
  }

}
