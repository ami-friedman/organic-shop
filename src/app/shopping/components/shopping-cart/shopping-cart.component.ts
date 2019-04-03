import { Component, OnInit } from '@angular/core';
import { CartService } from 'shared/services/cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cart: ShoppingCart;
  

  constructor(public cartService: CartService) { 
    this.cart = cartService.cart;
  }

}
