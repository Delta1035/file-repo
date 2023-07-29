import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDataRoutingModule } from './basic-data-routing.module';
import { BasicDataComponent } from './basic-data.component';


@NgModule({
  declarations: [
    BasicDataComponent
  ],
  imports: [
    CommonModule,
    BasicDataRoutingModule
  ]
})
export class BasicDataModule { }
