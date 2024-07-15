import { Routes, RouterModule } from '@angular/router';

import { Home } from './home.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { serviceList } from './components/servicelist/servicelist.component';
import { partOrder } from './components/partorder/partorder.component'
import { partOrderExpired } from './components/partorderexpired/partorderexpired.component'
import { barangDalamPerjalanan } from './components/barangdalamperjalanan/barangdalamperjalanan.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      // { path: '', redirectTo: 'servicelist', pathMatch: 'full' },
      // { path: 'servicelist', component: serviceList },
      // { path: 'partorder', component: partOrder },
      // { path: 'partorderexpired', component: partOrderExpired },
      // { path: 'barangdalamperjalanan', component: barangDalamPerjalanan }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule{

}
// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);

