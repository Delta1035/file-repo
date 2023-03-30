import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoopComponent } from './loop.component';

const routes: Routes = [{ path: '', component: LoopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoopRoutingModule { }
