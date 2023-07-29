import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';

import { CommonTableModule } from '@commonComponent/pms/common-table/common-table.module';
import { CustomFormControlModule } from '@commonComponent/pms/custom-form-control/custom-form-control.module';
import { HeaderModule } from '@commonComponent/pms/header/header.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PmsUserManagementRoutingModule } from './pms-user-management-routing.module';
import { PmsUserManagementComponent } from './pms-user-management.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
@NgModule({
  declarations: [PmsUserManagementComponent,UserEditModalComponent],
  imports: [
    CommonModule,
    PmsUserManagementRoutingModule,
    NzTabsModule,
    TranslateModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzSelectModule,
    NzCardModule,
    NzButtonModule,
    HeaderModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzMessageModule,
    NzToolTipModule,
    NzModalModule,
    NzRadioModule,
    ReactiveFormsModule,
    CustomFormControlModule,
    CommonTableModule,
    NzGridModule,
    NzUploadModule,
    NzDrawerModule,
    NzDescriptionsModule,
    NzCollapseModule,
  ],
  providers:[
  ]
})
export class PmsUserManagementModule {}
