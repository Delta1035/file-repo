import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFocusGuard } from 'src/app/focusGuard/page.focus.guard';
import { BudgetComponent } from './budget.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
    children: [
      {
        path: 'budgetMaintain',
        loadChildren: () => import('../budget-maintain/budget-maintain.module')
          .then(m => m.BudgetMaintainModule),
        canActivate: [PageFocusGuard]
      },
      {
        path: 'budgetPRF',
        loadChildren: () => import('../budget-prf/budget-prf.module')
          .then(m => m.BudgetPrfModule),
        canActivate: [PageFocusGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
