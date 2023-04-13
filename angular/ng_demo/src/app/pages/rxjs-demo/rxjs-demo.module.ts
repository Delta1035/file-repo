import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RxjsDemoRoutingModule } from './rxjs-demo-routing.module';
import { RxjsDemoComponent } from './rxjs-demo.component';

@NgModule({
  declarations: [RxjsDemoComponent],
  imports: [CommonModule, RxjsDemoRoutingModule],
})
export class RxjsDemoModule {}
