import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RootComponent } from './pages/root/root.component';


import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import '@cds/core/icon/register';
import '@cds/core/alert/register';
import { CdsModule } from '@cds/angular';

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    HttpClientModule,
    ClrAlertModule,
    CdsModule,
  ]
})
export class PublicModule { }
