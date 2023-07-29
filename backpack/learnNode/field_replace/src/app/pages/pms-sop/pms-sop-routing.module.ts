import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsSOPComponent } from './pms-sop.component';

const routes: Routes = [{ path: '', component: PmsSOPComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsSOPRoutingModule { }
