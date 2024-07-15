import { Routes, RouterModule } from '@angular/router';

import { Password } from './password.component';
import { ModuleWithProviders, NgModule } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Password,
    children: [

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordRoutingModule{

}
// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);
