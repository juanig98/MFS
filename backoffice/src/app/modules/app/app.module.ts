import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import '@cds/core/alert/register';
import '@cds/core/icon/register';
import { ClarityModule } from '@clr/angular';
import { AuthenticatedRoutingModule } from './app-routing.module';
import { ProductsTableComponent } from './components/products-table/products-table.component'; 
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { InboxComponent } from './pages/inbox/inbox.component';

 
@NgModule({
  declarations: [
    MainComponent,
    ProductsTableComponent, 
    ProductsComponent,
    DashboardComponent,
    PublicationsComponent,
    InboxComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    CdsModule
  ]
})
export class AppModule { }
