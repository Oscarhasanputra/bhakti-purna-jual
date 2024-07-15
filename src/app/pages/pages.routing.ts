import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
// noinspection TypeScriptValidateTypes

import { AuthGuard } from './login/auth-guard.service';

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'service', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: 'part', loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule) },
      { path: 'password', loadChildren: () => import('./password/password.module').then(m => m.PasswordModule) },
      { path: 'settings', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) }
    ],
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule{

}
// export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);