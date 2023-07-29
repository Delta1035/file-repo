import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpmTabComponent } from './ipm-tab.component';

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    IpmTabComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    IpmTabComponent
  ]
})
export class IpmTabModule { }
