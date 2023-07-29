import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MepBuWiwynnPajRoutingModule } from './mep-bu-wiwynn-paj-routing.module';
import { MepBuWiwynnPajComponent } from './mep-bu-wiwynn-paj.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Nz模块引入
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';

// 自定义组件引入
import { IpmTabModule } from '@commonComponent/common/ipm-tab/ipm-tab.module';


@NgModule({
  declarations: [
    MepBuWiwynnPajComponent
  ],
  imports: [
    CommonModule,
    MepBuWiwynnPajRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzFormModule,
    TranslateModule,
    IpmTabModule,
  ]
})
export class MepBuWiwynnPajModule { }
