import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CustomFormControlComponent } from './custom-form-control.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@NgModule({
  imports: [CommonModule,TranslateModule, NzFormModule,NzInputModule,NzSelectModule,FormsModule,ReactiveFormsModule,NzRadioModule],
  declarations: [CustomFormControlComponent, CustomInputComponent,CustomSelectComponent,CustomRadioComponent],
  exports: [CustomFormControlComponent, CustomInputComponent,CustomSelectComponent,CustomRadioComponent],
})
export class CustomFormControlModule {}
