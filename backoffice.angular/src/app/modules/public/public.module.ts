import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RootComponent } from './pages/root/root.component';


import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
  ]
})
export class PublicModule { }
