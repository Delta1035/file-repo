import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MepExternalNameMaintainComponent } from './mep-external-name-maintain.component';

const routes: Routes = [{ path: '', component: MepExternalNameMaintainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MepExternalNameMaintainRoutingModule { }
