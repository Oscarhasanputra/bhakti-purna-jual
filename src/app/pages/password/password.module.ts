import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Password } from './password.component';
import { PasswordRoutingModule } from './password.routing';

import { PasswordService } from './password.service';
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    PasswordRoutingModule,
    PrimengDefaultModule
  ],
  declarations: [
    Password
  ],
  providers: [
    PasswordService
  ]
})
export class PasswordModule { }
