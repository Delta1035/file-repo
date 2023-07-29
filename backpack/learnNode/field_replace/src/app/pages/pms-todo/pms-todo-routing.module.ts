import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsTodoComponent } from './pms-todo.component';

const routes: Routes = [{ path: '', component: PmsTodoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: [
   ]
})
export class PmsTodoRoutingModule { }
