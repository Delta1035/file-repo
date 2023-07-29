import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFocusGuard } from 'src/app/focusGuard/page.focus.guard';
import { MepComponent } from './mep.component';

const routes: Routes = [
  {
    path: '',
    component: MepComponent,
    children: [
      {
        path: 'mepSteps',
        loadChildren: () => import('../mep-steps/mep-steps.module')
          .then(m => m.MepStepsModule),
        canActivate: [PageFocusGuard]
      }, {
        path: 'mepPAJMaintain',
        loadChildren: () => import('../mep-paj-maintain/mep-paj-maintain.module')
          .then(m => m.MepPajMaintainModule),
        canActivate: [PageFocusGuard]
      }, {
        path: 'mepBUWiwynnPAJ',
        loadChildren: () => import('../mep-bu-wiwynn-paj/mep-bu-wiwynn-paj.module')
          .then(m => m.MepBuWiwynnPajModule)
      }, {
        path: 'mepExternalNameMaintain',
        loadChildren: () => import('../mep-external-name-maintain/mep-external-name-maintain.module')
          .then(m => m.MepExternalNameMaintainModule),
        canActivate: [PageFocusGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MepRoutingModule { }
