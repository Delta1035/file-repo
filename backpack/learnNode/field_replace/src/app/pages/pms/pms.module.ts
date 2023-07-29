import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PmsRoutingModule } from './pms-routing.module';
import { PmsComponent } from './pms.component';


@NgModule({
  declarations: [
    PmsComponent
  ],
  imports: [
  CommonModule,
    PmsRoutingModule,
    NzSpinModule
  ]
})
export class PmsModule { }
