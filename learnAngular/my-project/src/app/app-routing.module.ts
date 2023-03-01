/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-01-30 22:18:25
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-17 17:44:53
 * @FilePath: \my-project\src\app\app-routing.module.ts
 * @Description: 
 * 
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'article', loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule) },
  { path: 'monitor', loadChildren: () => import('./pages/monitor/monitor.module').then(m => m.MonitorModule) },
  { path: 'workplace', loadChildren: () => import('./pages/workplace/workplace.module').then(m => m.WorkplaceModule) },
  { path: 'basicForm', loadChildren: () => import('./pages/forms/basic-form/basic-form.module').then(m => m.BasicFormModule) },
  { path: 'layout', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule { }
