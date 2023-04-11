import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelaySubjectComponent } from './relay-subject.component';

const routes: Routes = [{ path: '', component: RelaySubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelaySubjectRoutingModule { }
