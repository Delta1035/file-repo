import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MepStepsComponent } from './mep-steps.component';

const routes: Routes = [{ path: '', component: MepStepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MepStepsRoutingModule { }
