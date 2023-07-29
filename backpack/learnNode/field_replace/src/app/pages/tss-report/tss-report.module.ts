import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TssReportRoutingModule } from './tss-report-routing.module';
import { TssReportComponent } from './tss-report.component';


@NgModule({
  declarations: [
    TssReportComponent
  ],
  imports: [
    CommonModule,
    TssReportRoutingModule
  ]
})
export class TssReportModule { }
