import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { Store } from '@ngrx/store';
import { selectProducts } from 'src/app/state/selectors/products.selectors';
import { AppState } from 'src/app/state/app.state';
import { DialogConfig } from 'src/app/models/interfaces/DialogConfig';
import { DialogAction } from 'src/app/models/enums/DialogAction.enum';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  products$: Observable<any> = new Observable();

  productDialog: DialogConfig<IProduct> = { open: false };

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
  }

  edit(product: IProduct): void {
    this.productDialog = {
      open: true,
      data: product,
      action: DialogAction.UPDATE,
    }
    console.log({ action: "edit", product })
  }

  delete(product: IProduct): void {
    console.log({ action: "delete", product })
  }

}
