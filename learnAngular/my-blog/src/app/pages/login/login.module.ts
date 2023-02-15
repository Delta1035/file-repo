import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    // CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    LoginRoutingModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
  ]
})
export class LoginModule { }
