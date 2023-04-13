import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeCycleRoutingModule } from './life-cycle-routing.module';
import { LifeCycleComponent } from './life-cycle.component';

@NgModule({
  declarations: [LifeCycleComponent],
  imports: [CommonModule, LifeCycleRoutingModule],
})
export class LifeCycleModule {}
