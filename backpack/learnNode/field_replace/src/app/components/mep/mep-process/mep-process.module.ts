import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MepProcessComponent } from './mep-process.component';

import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    MepProcessComponent
  ],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports: [
    MepProcessComponent
  ],
})
export class MepProcessModule { }
