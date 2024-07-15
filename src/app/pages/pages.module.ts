import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgBusyModule } from 'ng-busy';

import { PagesRoutingModule } from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { AuthGuard } from './login/auth-guard.service';
import { PagesService } from './pages.service';
import { PrimengDefaultModule } from '../theme/defaultprimeng.module';

@NgModule({
  imports: [CommonModule, NgaModule, PagesRoutingModule, NgBusyModule,PrimengDefaultModule],
  declarations: [Pages],
  providers: [
    AuthGuard,
    PagesService
  ]
})
export class PagesModule {
}
