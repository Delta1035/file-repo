import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent implements OnInit {
  ngOnInit(): void {
    setInterval(() => {
      this._on_push_age++;
    }, 2000);
  }
  @Input()
  age!: number;

  _on_push_age = 0;

  @Input()
  stat = 1;
  @Output()
  statChange = new EventEmitter();

  @Input()
  person:{name:string,age:number} = {
    name:'static name',
    age:19
  }
  add() {
    this._on_push_age++;
  }

  emitEventHandle(e: string) {
    console.log('received value from static son' + e);
  }

  fromApp() {
    this.statChange.emit(this.stat++);
    console.log(this.stat);
  }
}
