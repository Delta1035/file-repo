/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-17 14:05:39
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-17 14:36:42
 * @FilePath: \my-project\src\app\pages\welcome\welcome.module.ts
 * @Description: 
 * 
 */
import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [WelcomeRoutingModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
