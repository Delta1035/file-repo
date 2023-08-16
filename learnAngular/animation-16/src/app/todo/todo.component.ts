import { animate,style,transition,trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { slide } from '../shared/animations/slide.animation';
import { slideKeyframe } from '../shared/animations/slide-keyframe.animation';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    slide,
    slideKeyframe
  ]
})
export class TodoComponent {
  onSlideDone (v: string) {
    console.log('onSlideDone',v);
  }
  onSlideStart (v: string) {
    console.log('onSlideStart',v);
  }
  // todo 列表
  todos: string[] = ["Learn Angular","Learn RxJS","Learn NgRx"];
  // 添加 todo
  addItem (input: HTMLInputElement) {
    this.todos.push(input.value);
    input.value = "";
  }
  // 删除 todo
  removeItem (index: number) {
    this.todos.splice(index,1);
  }
  onKeyup () {
  }

}
