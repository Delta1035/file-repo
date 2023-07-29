import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsProcessComponent } from './pms-process.component';

const routes: Routes = [{ path: '', component: PmsProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsProcessRoutingModule { }
