import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectiveDemoComponent } from './directive-demo.component';

const routes: Routes = [{ path: '', component: DirectiveDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectiveDemoRoutingModule {}
