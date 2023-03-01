/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-01-30 22:18:25
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-17 15:02:14
 * @FilePath: \my-project\src\app\app.module.ts
 * @Description: 
 * 
 */
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import {FormsModule} from "@angular/forms";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { CoreModule } from './core/core.module';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    CoreModule
  ],
  providers: [...httpInterceptorProviders, { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
