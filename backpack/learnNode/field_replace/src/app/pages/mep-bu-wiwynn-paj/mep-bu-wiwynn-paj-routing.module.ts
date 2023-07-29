import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MepBuWiwynnPajComponent } from './mep-bu-wiwynn-paj.component';

const routes: Routes = [{ path: '', component: MepBuWiwynnPajComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MepBuWiwynnPajRoutingModule { }
