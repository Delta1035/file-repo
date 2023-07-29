import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDataOrganizationComponent } from './basic-data-organization.component';

const routes: Routes = [{ path: '', component: BasicDataOrganizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataOrganizationRoutingModule { }
