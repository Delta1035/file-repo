import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetMaintainComponent } from './budget-maintain.component';

const routes: Routes = [{ path: '', component: BudgetMaintainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetMaintainRoutingModule { }
