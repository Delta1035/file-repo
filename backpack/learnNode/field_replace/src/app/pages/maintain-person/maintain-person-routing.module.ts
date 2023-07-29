import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainPersonComponent } from './maintain-person.component';

const routes: Routes = [{ path: '', component: MaintainPersonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainPersonRoutingModule { }
