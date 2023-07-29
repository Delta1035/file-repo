import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HeaderComponent } from './header.component';


@NgModule({
  imports: [
  CommonModule,
    TranslateModule,
    NzButtonModule
  ],
  declarations: [HeaderComponent],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
