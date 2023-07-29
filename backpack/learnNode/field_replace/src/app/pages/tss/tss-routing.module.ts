import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFocusGuard } from 'src/app/focusGuard/page.focus.guard';
import { TssComponent } from './tss.component';

const routes: Routes = [
  {
    path: '',
    component: TssComponent,
    children: [
      {
        path: 'tssMaintain',
        loadChildren: () => import('../tss-maintain/tss-maintain.module')
          .then(m => m.TssMaintainModule),
        canActivate: [PageFocusGuard]
      },
      {
        path: 'tssReport',
        loadChildren: () => import('../tss-report/tss-report.module')
          .then(m => m.TssReportModule),
        canActivate: [PageFocusGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TssRoutingModule { }
