import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router'
import { HttpService } from '@services/http.service';
import { MsgService } from '@services/msg.service';
import { filter, Observable } from 'rxjs';
import { MessageType } from './model/message-type';
import { MyResponse } from './model/MyResponse';
import { User } from './model/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoding = true;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private msg: MsgService
  ) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoding = false;
        console.log('event', event, Date.now());
      });

    this.login({ user_name: 'delta', password: '3363787543' });
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
