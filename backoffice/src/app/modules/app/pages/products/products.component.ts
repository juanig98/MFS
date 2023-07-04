import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { loadProducts, loadedProducts, retrieveProductList } from 'src/app/state/actions/products.actions';
import { selectLoading, selectProducts } from 'src/app/state/selectors/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  loading$: Observable<boolean> = new Observable();


  constructor(
    private productService: ProductService,
    private store: Store<any>,
    private title: Title,

  ) { title.setTitle("Productos") }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.store.select(selectProducts).subscribe({
      next: res => {
        if (!res.length)
          this.store.dispatch(loadProducts());
      }
    });


  }
}
