import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonTableModule } from '@commonComponent/pms/common-table/common-table.module';
import { CustomFormControlModule } from '@commonComponent/pms/custom-form-control/custom-form-control.module';

import { HeaderModule } from '@commonComponent/pms/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IsApprovedNullPipe } from './is-approved-null.pipe';
import { IsCurrentUserPipe } from './is-current-user.pipe';
import { PmsTodoRoutingModule } from './pms-todo-routing.module';
import { PmsTodoComponent } from './pms-todo.component';
import { ProjectProcessDetailComponent } from './project-process-detail/project-process-detail.component';


@NgModule({
  declarations: [
    PmsTodoComponent,
    ProjectProcessDetailComponent,
    IsCurrentUserPipe,
    IsApprovedNullPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PmsTodoRoutingModule,
    HeaderModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    CustomFormControlModule,
    FormsModule,
    NzDatePickerModule,
    CommonTableModule,
    NzToolTipModule,
    NzDrawerModule,
    NzDividerModule,
    NzCollapseModule,
    NzRadioModule
  ]
})
export class PmsTodoModule { }
