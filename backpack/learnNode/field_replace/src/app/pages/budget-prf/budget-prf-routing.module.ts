import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetPrfComponent } from './budget-prf.component';

const routes: Routes = [{ path: '', component: BudgetPrfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetPrfRoutingModule { }
