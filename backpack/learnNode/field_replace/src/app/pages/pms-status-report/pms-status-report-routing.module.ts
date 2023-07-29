import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsStatusReportComponent } from './pms-status-report.component';

const routes: Routes = [{ path: '', component: PmsStatusReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsStatusReportRoutingModule { }
