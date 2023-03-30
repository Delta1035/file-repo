import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnDestroy {
  @Input()
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input()
  countInterval = 20;
  public currentNumber = 0;
  private _counterSub$ = new Subject<number>();
  private _onDestroySub$ = new Subject();

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
