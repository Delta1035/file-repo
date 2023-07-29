import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainPersonRoutingModule } from './maintain-person-routing.module';
import { MaintainPersonComponent } from './maintain-person.component';

import { FormsModule } from '@angular/forms';

// Nz模块引入
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';

// i18n多语言引入
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MaintainPersonComponent
  ],
  imports: [
    CommonModule,
    MaintainPersonRoutingModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule,
    NzModalModule,
    TranslateModule,
  ]
})
export class MaintainPersonModule { }
