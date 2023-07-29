import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportCheckingRoutingModule } from './report-checking-routing.module';
import { ReportCheckingComponent } from './report-checking.component';


@NgModule({
  declarations: [
    ReportCheckingComponent
  ],
  imports: [
    CommonModule,
    ReportCheckingRoutingModule
  ]
})
export class ReportCheckingModule { }
