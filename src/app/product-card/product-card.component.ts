import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product;
  @Input('show-action') showAction = true;


  constructor(private cartService: CartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
