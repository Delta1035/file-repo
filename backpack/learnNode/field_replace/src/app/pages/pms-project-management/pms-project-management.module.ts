import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IpmTabModule } from '@commonComponent/common/ipm-tab/ipm-tab.module';
import { CommonTableModule } from '@commonComponent/pms/common-table/common-table.module';
import { CustomFormControlModule } from '@commonComponent/pms/custom-form-control/custom-form-control.module';
import { HeaderModule } from '@commonComponent/pms/header/header.module';
import { TipModalModule } from '@commonComponent/pms/tip-modal/tip-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AddJiraProjectModalComponent } from './add-jira-project-modal/add-jira-project-modal.component';
import { AddJiraUserModalComponent } from './add-jira-user-modal/add-jira-user-modal.component';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
import { AddProjectRepoComponent } from './add-project-repo/add-project-repo.component';
import { AddProjectUserComponent } from './add-project-user/add-project-user.component';
import { CheckOperateIconPipe } from './check-operate-icon.pipe';
import { PmsProjectManagementRoutingModule } from './pms-project-management-routing.module';
import { PmsProjectManagementComponent } from './pms-project-management.component';
import { SendToApproveModalComponent } from './send-to-approve-modal/send-to-approve-modal.component';

@NgModule({
  declarations: [
    PmsProjectManagementComponent,
    AddProjectModalComponent,
    CheckOperateIconPipe,
    AddProjectRepoComponent,
    AddProjectUserComponent,
    AddJiraProjectModalComponent,
    AddJiraUserModalComponent,
    SendToApproveModalComponent,
  ],
  imports: [
  CommonModule,
    PmsProjectManagementRoutingModule,
    IpmTabModule,
    HeaderModule,
    TranslateModule,
    NzToolTipModule,
    NzButtonModule,
    NzTabsModule,
    CommonTableModule,
    CustomFormControlModule,
    FormsModule,
    NzIconModule,
    NzFormModule,
    NzModalModule,
    NzCollapseModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzCardModule,
    NzAutocompleteModule,
    NzInputModule,
    NzDividerModule,
    TipModalModule,
    NzSpinModule 
  ]
})
export class PmsProjectManagementModule { }
