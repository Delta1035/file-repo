import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';



@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    CommonModule,TagRoutingModule
  ]
})
export class TagModule { }
