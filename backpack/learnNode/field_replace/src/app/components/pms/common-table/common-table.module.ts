import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CommonTableComponent } from './common-table.component';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzTableModule,
    NzToolTipModule,
    TranslateModule,
    NzButtonModule
  ],
  declarations: [	CommonTableComponent,
   ],
  exports:[
    CommonTableComponent
  ]
})
export class CommonTableModule { }
