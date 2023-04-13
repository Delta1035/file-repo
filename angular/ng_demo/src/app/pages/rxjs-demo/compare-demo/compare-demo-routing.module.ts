import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareDemoComponent } from './compare-demo.component';

const routes: Routes = [{ path: '', component: CompareDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareDemoRoutingModule { }
