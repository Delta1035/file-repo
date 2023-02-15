import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/model/message-type';
import { MyResponse } from 'src/app/model/MyResponse';
import { User } from 'src/app/model/User.model';
import { HttpService } from 'src/app/services/http.service';
import { MsgService } from 'src/app/services/msg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private httpService: HttpService,
    private msg: MsgService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      user_name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.login(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  login({ user_name, password }: Partial<User>) {
    this.httpService
      .login({ user_name, password })
      .subscribe((result: MyResponse<string>) => {
        if (result.code === 2000) {
          const token = result.data;
          localStorage.setItem('token', JSON.stringify(token));
          this.msg.createMassage(MessageType.success, '登陆成功!');
          setTimeout(() => {
            // this.router.navigateByUrl('/dashbord')
            this.router.navigate(['dashbord'], { skipLocationChange: false });
          }, 500);
        } else {
          this.msg.createMassage(MessageType.error, '登陆失败!');
        }
      });
  }
}
