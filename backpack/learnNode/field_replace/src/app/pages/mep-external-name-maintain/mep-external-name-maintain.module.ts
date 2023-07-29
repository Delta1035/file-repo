import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MepExternalNameMaintainRoutingModule } from './mep-external-name-maintain-routing.module';
import { MepExternalNameMaintainComponent } from './mep-external-name-maintain.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MepExternalNameMaintainComponent
  ],
  imports: [
    CommonModule,
    MepExternalNameMaintainRoutingModule,
    FormsModule,
    TranslateModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    NzSpinModule
  ]
})
export class MepExternalNameMaintainModule { }
