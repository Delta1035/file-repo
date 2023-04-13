import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-static-son',
  templateUrl: './static-son.component.html',
  styleUrls: ['./static-son.component.scss'],
})
export class StaticSonComponent {
  @Output()
  emitEvent = new EventEmitter();
  emit() {
    this.emitEvent.emit(1);
  }
}
