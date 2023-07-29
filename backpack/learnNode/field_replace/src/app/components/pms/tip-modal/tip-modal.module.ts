import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipModalComponent } from './tip-modal.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  imports: [
    CommonModule,
    NzToolTipModule,
    TranslateModule,
    NzIconModule,
    NzModalModule,
    NzCardModule 
  ],
  declarations: [TipModalComponent],
  exports:[
    TipModalComponent
  ]
})
export class TipModalModule { }
