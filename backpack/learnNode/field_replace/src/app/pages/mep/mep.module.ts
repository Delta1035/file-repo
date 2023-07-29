import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MepRoutingModule } from './mep-routing.module';
import { MepComponent } from './mep.component';


@NgModule({
  declarations: [
    MepComponent
  ],
  imports: [
    CommonModule,
    MepRoutingModule
  ]
})
export class MepModule { }
