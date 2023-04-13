import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickCountRoutingModule } from './click-count-routing.module';
import { ClickCountComponent } from './click-count.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClickCountComponent],
  imports: [CommonModule, ClickCountRoutingModule, FormsModule, SharedModule],
})
export class ClickCountModule {}
