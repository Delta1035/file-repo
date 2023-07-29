import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetMaintainRoutingModule } from './budget-maintain-routing.module';
import { BudgetMaintainComponent } from './budget-maintain.component';

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

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';

// 自定义模块引入
import { IpmModalItemModule } from '@commonComponent/common/ipm-modal-item/ipm-modal-item.module';


@NgModule({
  declarations: [
    BudgetMaintainComponent
  ],
  imports: [
    CommonModule,
    BudgetMaintainRoutingModule,
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
    TranslateModule,
    IpmModalItemModule,
  ]
})
export class BudgetMaintainModule { }
