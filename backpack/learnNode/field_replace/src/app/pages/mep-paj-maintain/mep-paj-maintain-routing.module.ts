import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MepPajMaintainComponent } from './mep-paj-maintain.component';

const routes: Routes = [{ path: '', component: MepPajMaintainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MepPajMaintainRoutingModule { }
