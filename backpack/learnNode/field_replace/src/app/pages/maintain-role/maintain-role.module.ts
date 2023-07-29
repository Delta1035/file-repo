import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainRoleRoutingModule } from './maintain-role-routing.module';
import { MaintainRoleComponent } from './maintain-role.component';

import { FormsModule } from '@angular/forms';

// Nz模块引入
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';

// 自定义模块引入
import { IpmModalItemModule } from '@commonComponent/common/ipm-modal-item/ipm-modal-item.module';


@NgModule({
  declarations: [
    MaintainRoleComponent
  ],
  imports: [
    CommonModule,
    MaintainRoleRoutingModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzModalModule,
    NzCheckboxModule,
    TranslateModule,
    IpmModalItemModule,
  ]
})
export class MaintainRoleModule { }
