/*
 * @Author: Delta_Zheng Delta_Zheng@wistronits.com
 * @Date: 2023-02-01 16:48:10
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-02-01 17:34:27
 * @FilePath: \ng_demo\src\app\app-routing.module.ts
 * @Description: 
 * 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicComponentComponent } from './pages/dynamic-component/dynamic-component.component';

const routes: Routes = [
  {
    path:'dynamic-component',
    component:DynamicComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
