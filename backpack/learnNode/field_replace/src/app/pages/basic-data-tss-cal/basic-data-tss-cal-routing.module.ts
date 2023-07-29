import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDataTssCalComponent } from './basic-data-tss-cal.component';

const routes: Routes = [{ path: '', component: BasicDataTssCalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataTssCalRoutingModule { }
