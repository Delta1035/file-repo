import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDataResourceGroupComponent } from './basic-data-resource-group.component'

const routes: Routes = [{ path: '', component: BasicDataResourceGroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataResourceGroupRoutes { }
