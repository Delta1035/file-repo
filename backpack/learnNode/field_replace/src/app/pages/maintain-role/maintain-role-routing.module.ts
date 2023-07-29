import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainRoleComponent } from './maintain-role.component';

const routes: Routes = [{ path: '', component: MaintainRoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoleRoutingModule { }
