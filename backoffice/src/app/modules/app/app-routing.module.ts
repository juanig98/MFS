import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { PublicationsComponent } from './pages/publications/publications.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'productos', component: ProductsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'publicaciones', component: PublicationsComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'prefix' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
