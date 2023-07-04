import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { Store } from '@ngrx/store';
import { selectProducts } from 'src/app/state/selectors/products.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  products$: Observable<any> = new Observable();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
  }
}
