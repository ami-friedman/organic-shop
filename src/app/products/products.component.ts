import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any[];
  filteredProducts: any[];
  category;

  constructor(productService: ProductService,
              route: ActivatedRoute) { 
    productService.getAll().pipe(switchMap( products => {
      this.filteredProducts = this.products = products;
      return route.queryParamMap;
    }))
    .subscribe( item => {
        this.category = item.get('category');
        this.filteredProducts = this.category ? 
        this.products.filter( product => product.category === this.category ) 
        : this.products;
      });
   
  }


}
