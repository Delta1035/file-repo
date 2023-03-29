import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonSchemaComponent } from './json-schema.component';

const routes: Routes = [{ path: '', component: JsonSchemaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonSchemaRoutingModule { }
