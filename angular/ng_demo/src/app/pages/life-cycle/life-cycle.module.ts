import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LifeCycleRoutingModule } from './life-cycle-routing.module';
import { LifeCycleComponent } from './life-cycle.component';

@NgModule({
  declarations: [LifeCycleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LifeCycleRoutingModule,
  ],
})
export class LifeCycleModule {}
