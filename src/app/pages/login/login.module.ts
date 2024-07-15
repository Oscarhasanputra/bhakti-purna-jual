import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgBusyModule } from 'ng-busy';

import { Login } from './login.component';
import { LoginRoutingModule } from './login.routing';

import { LoginService } from './login.service';
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    LoginRoutingModule,
    NgBusyModule,
    PrimengDefaultModule
  ],
  declarations: [
    Login
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
