import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkplaceRoutingModule } from './workplace-routing.module';
import { WorkplaceComponent } from './workplace.component';


@NgModule({
  declarations: [
    WorkplaceComponent
  ],
  imports: [
    CommonModule,
    WorkplaceRoutingModule
  ]
})
export class WorkplaceModule { }
