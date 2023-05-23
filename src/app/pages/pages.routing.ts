import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

import { AuthGuard } from './login/auth-guard.service';

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('app/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'master', loadChildren: () => import('app/pages/master/master.module').then(m => m.MasterModule) },
      { path: 'dashboard', loadChildren: () => import('app/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'home', loadChildren: () => import('app/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'service', loadChildren: () => import('app/pages/services/services.module').then(m => m.ServicesModule) },
      { path: 'report', loadChildren: () => import('app/pages/report/report.module').then(m => m.ReportModule) },
      { path: 'part', loadChildren: () => import('app/pages/parts/parts.module').then(m => m.PartsModule) },
      { path: 'password', loadChildren: () => import('app/pages/password/password.module').then(m => m.PasswordModule) },
      { path: 'settings', loadChildren: () => import('app/pages/setting/setting.module').then(m => m.SettingModule) }
    ],
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);