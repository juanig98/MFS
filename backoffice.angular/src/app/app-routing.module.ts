import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  { path: 'app', loadChildren: () => import('./modules/authenticated/authenticated.module').then(m => m.AuthenticatedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
