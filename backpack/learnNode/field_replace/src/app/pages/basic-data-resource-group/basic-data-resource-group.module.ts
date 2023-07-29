import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataResourceGroupComponent } from './basic-data-resource-group.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BasicDataResourceGroupRoutes } from './basic-data-resource-group.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    CommonModule,
    BasicDataResourceGroupRoutes,
    FormsModule,
    TranslateModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzSelectModule,
    NzModalModule,
    NzSpinModule
  ],
  providers: [NzMessageService],
  declarations: [BasicDataResourceGroupComponent]
})
export class BasicDataResourceGroupModule { }
