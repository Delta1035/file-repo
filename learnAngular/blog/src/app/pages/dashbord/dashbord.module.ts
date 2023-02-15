import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';


@NgModule({
  declarations: [
    DashbordComponent
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
  ]
})
export class DashbordModule { }
