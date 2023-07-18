import { Component } from '@angular/core';
interface List {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-ngfor',
  templateUrl: './ngfor.component.html',
  styleUrls: ['./ngfor.component.scss'],
})
export class NgforComponent {
  onClickToAdd() {
    this.list.push(this.list[0]);
  }
  list: List[] = [
    { id: 1, name: '张三', age: 20 },
    { id: 2, name: '李四', age: 30 },
  ];

  identify(index: number, item: List) {
    return item.id;
  }

  onClickToRemove() {
    this.list.splice(Math.random() * this.list.length, 1);
  }
}
