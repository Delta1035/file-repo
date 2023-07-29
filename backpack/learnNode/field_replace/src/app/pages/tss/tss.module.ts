import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TssRoutingModule } from './tss-routing.module';
import { TssComponent } from './tss.component';


@NgModule({
  declarations: [
    TssComponent
  ],
  imports: [
    CommonModule,
    TssRoutingModule
  ]
})
export class TssModule { }
