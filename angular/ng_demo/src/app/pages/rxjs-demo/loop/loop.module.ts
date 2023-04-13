import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoopRoutingModule } from './loop-routing.module';
import { LoopComponent } from './loop.component';

@NgModule({
  declarations: [LoopComponent],
  imports: [CommonModule, LoopRoutingModule],
})
export class LoopModule {}
