import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
  ) {

  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: response => {
        this.products = response;
      }
    })
  }
}
