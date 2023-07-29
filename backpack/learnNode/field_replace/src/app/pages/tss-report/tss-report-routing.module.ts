import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TssReportComponent } from './tss-report.component';

const routes: Routes = [{ path: '', component: TssReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TssReportRoutingModule { }
