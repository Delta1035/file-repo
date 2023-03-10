import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  name = new FormControl('zhangsan');
  password = new FormControl('123456');
  custom =  new FormControl(1)

  loginForm = new FormGroup({
    name: this.name,
    password: this.password,
    custom: this.custom
  });
  log() {
    console.log(this.name.value);
    console.log(this.password.value);
    console.log(this.custom.value);
  }
}
