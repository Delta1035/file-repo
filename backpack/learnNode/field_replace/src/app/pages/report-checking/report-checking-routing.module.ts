import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCheckingComponent } from './report-checking.component';

const routes: Routes = [{ path: '', component: ReportCheckingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCheckingRoutingModule { }
