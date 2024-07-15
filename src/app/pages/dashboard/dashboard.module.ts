import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { DashboardRoutingModule }       from './dashboard.routing';
import { PrimengDefaultModule } from '../../theme/defaultprimeng.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    DashboardRoutingModule,
    PrimengDefaultModule
  ],
  declarations: [
    Dashboard
  ],
  providers: [
   ]
})
export class DashboardModule {}
