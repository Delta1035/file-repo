import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TechProcessComponent } from './tech-process.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NzCardModule,
    NzGridModule,
  ],
  declarations: [TechProcessComponent],
  exports:[
    TechProcessComponent,
  ]
})
export class TechProcessModule { }
