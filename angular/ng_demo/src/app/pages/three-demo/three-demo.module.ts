import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDemoRoutingModule } from './three-demo-routing.module';
import { ThreeDemoComponent } from './three-demo.component';
import { LineComponent } from './line/line.component';
import { TextComponent } from './text/text.component';
import { LoadModelComponent } from './load-model/load-model.component';
import { FirstDemoComponent } from './first-demo/first-demo.component';


@NgModule({
  declarations: [
    ThreeDemoComponent,
    LineComponent,
    TextComponent,
    LoadModelComponent,
    FirstDemoComponent
  ],
  imports: [
    CommonModule,
    ThreeDemoRoutingModule
  ]
})
export class ThreeDemoModule { }
