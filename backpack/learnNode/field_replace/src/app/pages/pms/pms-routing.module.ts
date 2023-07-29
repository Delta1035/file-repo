import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsComponent } from './pms.component';

const routes: Routes = [
  {
    path: '',
    component: PmsComponent,
    children: [
      {
        path: 'pmsProcess',
        loadChildren: () => import('../pms-process/pms-process.module')
          .then(m => m.PmsProcessModule),
        data:{
          subTitle:'home.pmsProcess'
        }
      },
      {
        path: 'pmsSOP',
        loadChildren: () => import('../pms-sop/pms-sop.module')
          .then(m => m.PmsSOPModule),
          data:{
            subTitle:'home.pmsSOP'
          }
      },
      {
        path: 'pmsUserManagement',
        loadChildren: () => import('../pms-user-management/pms-user-management.module')
          .then(m => m.PmsUserManagementModule),
          data:{
            subTitle:'home.pmsUserManagement'
          }
      },
      {
        path: 'pmsProjectManagement',
        loadChildren: () => import('../pms-project-management/pms-project-management.module')
          .then(m => m.PmsProjectManagementModule),
          data:{
            subTitle:'home.pmsProjectManagement'
          }
      },
      {
        path: 'pmsTodo',
        loadChildren: () => import('../pms-todo/pms-todo.module').
          then(m => m.PmsTodoModule),
          data:{
            subTitle:'home.pmsTodo'
          }
      },
      {
        path: 'pmsStatusReport',
        loadChildren: () => import('../pms-status-report/pms-status-report.module')
          .then(m => m.PmsStatusReportModule),
          data:{
            subTitle:'home.pmsStatusReport'
          }
      },
      {
        path: 'pmsDivisionReport',
        loadChildren: () => import('../pms-division-report/pms-division-report.module')
          .then(m => m.PmsDivisionReportModule),
          data:{
            subTitle:'home.pmsDivisionReport'
          }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsRoutingModule { }
