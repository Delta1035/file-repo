import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  @Input()
  person = {
    name:'from default',
    age:13
  }
}
