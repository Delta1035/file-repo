import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicDataTssCalComponent } from './basic-data-tss-cal.component';
import { BasicDataTssCalRoutingModule } from './basic-data-tss-cal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IpmTabModule } from '@commonComponent/common/ipm-tab/ipm-tab.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  imports: [
    CommonModule,
    BasicDataTssCalRoutingModule,
    FormsModule,
    TranslateModule,
    IpmTabModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzModalModule,
    NzSelectModule,
    NzFormModule,
  ],
  providers: [NzMessageService],
  declarations: [BasicDataTssCalComponent]
})
export class BasicDataTssCalModule { }
