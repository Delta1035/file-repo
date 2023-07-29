import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFocusGuard } from 'src/app/focusGuard/page.focus.guard';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: 'reportChecking',
        loadChildren: () => import('../report-checking/report-checking.module')
          .then(m => m.ReportCheckingModule),
        canActivate: [PageFocusGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
