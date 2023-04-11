import { Component, Input, OnDestroy } from '@angular/core';
import {
  map,
  mapTo,
  scan,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  timer,
} from 'rxjs';

@Component({
  selector: 'number-tracker',
  templateUrl: './number-tracker.component.html',
  styleUrls: ['./number-tracker.component.scss'],
})
export class NumberTrackerComponent implements OnDestroy {
  @Input()
  // 结束范围
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input()
  countInterval = 30;
  public currentNumber = 0;
  private _counterSub$ = new Subject<number>();
  private _onDestroy$ = new Subject();
  constructor() {
    this._counterSub$
      .pipe(
        switchMap((endRange) => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          );
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((val: number) => (this.currentNumber = val));
  }

  private positiveOrNegative(endRange: number, currentNumber: number) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange: number, currentNumber: number) {
    return endRange > currentNumber
      ? (val: any) => val <= endRange
      : (val: any) => val >= endRange;
  }

  ngOnDestroy() {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }
}
