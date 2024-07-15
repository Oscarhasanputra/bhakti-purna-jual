import { Routes, RouterModule } from '@angular/router';

import { Setting } from './setting.component';

import { GeneralSetting } from './components/generalsetting/generalsetting.component';
import { NgModule } from '@angular/core';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Setting,
    children: [
      { path: 'generalsetting', component: GeneralSetting }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule{}
// export const routing = RouterModule.forChild(routes);
