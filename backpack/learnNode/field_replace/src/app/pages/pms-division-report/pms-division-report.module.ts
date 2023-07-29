import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonTableModule } from '@commonComponent/pms/common-table/common-table.module';
import { CustomFormControlModule } from '@commonComponent/pms/custom-form-control/custom-form-control.module';
import { HeaderModule } from '@commonComponent/pms/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PmsDivisionReportRoutingModule } from './pms-division-report-routing.module';
import { PmsDivisionReportComponent } from './pms-division-report.component';



@NgModule({
  declarations: [
    PmsDivisionReportComponent
  ],
  imports: [
    CommonModule,
    PmsDivisionReportRoutingModule,
    HeaderModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    CustomFormControlModule,
    FormsModule,
    NzDatePickerModule,
    CommonTableModule,
    NzToolTipModule,
    TranslateModule
  ]
})
export class PmsDivisionReportModule { }
