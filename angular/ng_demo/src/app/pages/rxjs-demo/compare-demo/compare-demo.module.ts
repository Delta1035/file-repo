import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareDemoRoutingModule } from './compare-demo-routing.module';
import { CompareDemoComponent } from './compare-demo.component';


@NgModule({
  declarations: [
    CompareDemoComponent
  ],
  imports: [
    CommonModule,
    CompareDemoRoutingModule
  ]
})
export class CompareDemoModule { }
