import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsProjectManagementComponent } from './pms-project-management.component';

const routes: Routes = [{ path: '', component: PmsProjectManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class PmsProjectManagementRoutingModule { }
