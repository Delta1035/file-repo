import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickCountComponent } from './click-count.component';

const routes: Routes = [{ path: '', component: ClickCountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClickCountRoutingModule { }
