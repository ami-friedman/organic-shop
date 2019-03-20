import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  product = {};
  id;

  constructor(categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(take(1))
      .subscribe( item => this.product = item );
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
