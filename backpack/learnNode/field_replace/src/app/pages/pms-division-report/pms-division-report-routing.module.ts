import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsDivisionReportComponent } from './pms-division-report.component';

const routes: Routes = [{ path: '', component: PmsDivisionReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsDivisionReportRoutingModule { }
