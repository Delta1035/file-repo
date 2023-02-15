import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = 'my-project';
  userName = '';
  password = '';
  submit() {
    this.http
      .post('http://127.0.0.1/login', {
        userName: this.userName,
        password: this.password,
      })
      .subscribe((observer)=>{
        console.log(observer);
      });
  }
}
