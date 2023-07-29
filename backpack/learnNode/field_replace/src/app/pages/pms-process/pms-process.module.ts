import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TechProcessModule } from '@commonComponent/pms/tech-process/tech-process.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { PmsProcessRoutingModule } from './pms-process-routing.module';
import { PmsProcessComponent } from './pms-process.component';


@NgModule({
  declarations: [
    PmsProcessComponent,
  ],
  imports: [
    CommonModule,
    PmsProcessRoutingModule,
    TechProcessModule,
    TranslateModule,
    NzCardModule,
    NzGridModule,
  ]
})
export class PmsProcessModule { }
