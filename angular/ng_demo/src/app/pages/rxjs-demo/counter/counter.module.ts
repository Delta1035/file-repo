import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, CounterRoutingModule, SharedModule],
})
export class CounterModule {}
