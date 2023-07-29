import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsUserManagementComponent } from './pms-user-management.component';

const routes: Routes = [{ path: '', component: PmsUserManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsUserManagementRoutingModule { }
