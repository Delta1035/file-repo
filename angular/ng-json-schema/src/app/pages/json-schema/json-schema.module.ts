import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonSchemaRoutingModule } from './json-schema-routing.module';
import { JsonSchemaComponent } from './json-schema.component';


@NgModule({
  declarations: [
    JsonSchemaComponent
  ],
  imports: [
    CommonModule,
    JsonSchemaRoutingModule
  ]
})
export class JsonSchemaModule { }
