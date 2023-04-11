import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelaySubjectRoutingModule } from './relay-subject-routing.module';
import { RelaySubjectComponent } from './relay-subject.component';


@NgModule({
  declarations: [
    RelaySubjectComponent
  ],
  imports: [
    CommonModule,
    RelaySubjectRoutingModule
  ]
})
export class RelaySubjectModule { }
