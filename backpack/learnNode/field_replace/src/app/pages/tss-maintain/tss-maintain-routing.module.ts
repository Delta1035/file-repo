import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TssMaintainComponent } from './tss-maintain.component';

const routes: Routes = [{ path: '', component: TssMaintainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TssMaintainRoutingModule { }
