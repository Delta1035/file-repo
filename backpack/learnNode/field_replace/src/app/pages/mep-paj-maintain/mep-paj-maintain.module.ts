import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MepPajMaintainRoutingModule } from './mep-paj-maintain-routing.module';
import { MepPajMaintainComponent } from './mep-paj-maintain.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Nz模块引入
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCardModule } from 'ng-zorro-antd/card';

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';

// 自定义组件引入
import { IpmTabModule } from '@commonComponent/common/ipm-tab/ipm-tab.module';
import { IpmModalItemModule } from '@commonComponent/common/ipm-modal-item/ipm-modal-item.module';
import { MepProcessModule } from '@commonComponent/mep/mep-process/mep-process.module';


@NgModule({
  declarations: [
    MepPajMaintainComponent
  ],
  imports: [
    CommonModule,
    MepPajMaintainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule,
    NzModalModule,
    NzFormModule,
    NzUploadModule,
    NzCardModule,
    TranslateModule,
    IpmTabModule,
    IpmModalItemModule,
    MepProcessModule
  ]
})
export class MepPajMaintainModule { }
