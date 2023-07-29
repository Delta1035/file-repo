import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDataOrganizationRoutingModule } from './basic-data-organization-routing.module';
import { BasicDataOrganizationComponent } from './basic-data-organization.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
@NgModule({
  declarations: [
    BasicDataOrganizationComponent
  ],
  imports: [
    CommonModule,
    BasicDataOrganizationRoutingModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzModalModule,
    NzSpinModule,
    TranslateModule,
  ],
  providers: [NzMessageService]
})
export class BasicDataOrganizationModule { }
