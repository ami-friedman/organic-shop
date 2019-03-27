import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any[];
  filteredProducts: any[];
  categories$;

  constructor(productService: ProductService,
              categoryService: CategoryService,
              route: ActivatedRoute) { 
    productService.getAll().pipe(switchMap( products => {
      this.filteredProducts = this.products = products;
      return route.queryParamMap;
    }))
    .subscribe( item => {
        const category = item.get('category');
        this.filteredProducts = category ? 
        this.products.filter( product => product.category === category ) 
        : this.products;
      });
    this.categories$ = categoryService.getAll();
   
  }


}
