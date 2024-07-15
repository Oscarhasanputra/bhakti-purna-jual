import { Routes, RouterModule }  from '@angular/router';

import { Login } from './login.component';
import { ModuleWithProviders, NgModule } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Login
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule{

}

// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);
