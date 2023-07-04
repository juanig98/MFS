import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';


import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import '@cds/core/alert/register';
import '@cds/core/icon/register';
import { ClrAlertModule } from '@clr/angular';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [ 
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
