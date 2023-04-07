import { Component, Input, OnDestroy } from '@angular/core';
import { map, mapTo, startWith, Subject, switchMap, timer } from 'rxjs';

@Component({
  selector: 'number-tracker',
  templateUrl: './number-tracker.component.html',
  styleUrls: ['./number-tracker.component.scss'],
})
export class NumberTrackerComponent implements OnDestroy {
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

  constructor() {
    this._counterSub$.pipe(
      // switchMap接收一个回调函数，返回一个observerable
      switchMap((endRange) => {
        // 从第0秒开始 每个this.countInterval秒发出一个值 0 1 2 3 4 5...
        return timer(0, this.countInterval).pipe(
          // 将源数据映射为指定值
          mapTo(this.positiveOrNagative(endRange,this.currentNumber)),
          // 在前一个数据源之前加上 this.currentNumber
          startWith( this.currentNumber)
        );
      })
    );
  }

  private positiveOrNagative(endRange: number, currentNumber: number) {
    return endRange > currentNumber ? 1 : -1;
    // return endRange > currentNumber
    //   ? (val) => val <= endRange
    //   : (val) => val >= endRange;
  }
}
