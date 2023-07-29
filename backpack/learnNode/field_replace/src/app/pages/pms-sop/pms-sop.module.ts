import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MarkdownModule } from 'ngx-markdown';
import { PmsSOPRoutingModule } from './pms-sop-routing.module';
import { PmsSOPComponent } from './pms-sop.component';

@NgModule({
  declarations: [
    PmsSOPComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PmsSOPRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    TranslateModule,
    NzSelectModule,
    NzCardModule,
  ]
})
export class PmsSOPModule { }
