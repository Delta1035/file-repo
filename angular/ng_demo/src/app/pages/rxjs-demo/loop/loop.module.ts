import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoopRoutingModule } from './loop-routing.module';
import { LoopComponent } from './loop.component';

@NgModule({
  declarations: [LoopComponent],
  imports: [CommonModule, LoopRoutingModule, SharedModule],
})
export class LoopModule {}
