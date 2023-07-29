import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpmModalItemComponent } from './ipm-modal-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Nz模块引入
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    IpmModalItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzToolTipModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
    TranslateModule,
  ],
  exports: [
    IpmModalItemComponent
  ]
})
export class IpmModalItemModule { }
