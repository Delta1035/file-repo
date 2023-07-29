import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataDivDeptComponent } from './basic-data-div-dept.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BasicDataDivDeptRoutes } from './basic-data-div-dept.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IpmTabModule } from '@commonComponent/common/ipm-tab/ipm-tab.module';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 自定义模块引入
import { IpmModalItemModule } from '@commonComponent/common/ipm-modal-item/ipm-modal-item.module';


@NgModule({
  imports: [
    CommonModule,
    BasicDataDivDeptRoutes,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzModalModule,
    NzSpinModule,
    NzCheckboxModule,
    NzInputNumberModule,
    IpmTabModule,
    IpmModalItemModule
  ],
  providers: [NzMessageService],
  declarations: [BasicDataDivDeptComponent]
})
export class BasicDataDivDeptModule { }
