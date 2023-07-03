import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule
  ]
})
export class AuthenticatedModule { }
