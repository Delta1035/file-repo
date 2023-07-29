import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDataDivDeptComponent } from './basic-data-div-dept.component'

const routes: Routes = [{ path: '', component: BasicDataDivDeptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataDivDeptRoutes { }
