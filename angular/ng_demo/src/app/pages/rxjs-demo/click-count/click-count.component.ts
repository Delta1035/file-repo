import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  Subject,
  combineAll,
  combineLatestAll,
  count,
  debounceTime,
  forkJoin,
  fromEvent,
  map,
  mapTo,
  of,
  reduce,
  repeat,
  scan,
  takeUntil,
  tap,
  throttleTime,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-click-count',
  templateUrl: './click-count.component.html',
  styleUrls: ['./click-count.component.scss'],
})
export class ClickCountComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroyed$ = new Subject();
  inputText$!:Observable<string>;
  InputTextbinding!:string;
  @ViewChild('btn')
  btn!: ElementRef<HTMLButtonElement>;

  @ViewChild('input')
  input!:ElementRef<HTMLInputElement>;
  constructor() {}
  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initClickHandle();
    this.initInputHandle();
  }

  initClickHandle() {
    const btn = this.btn.nativeElement;
    const click$ = fromEvent(btn, 'click').pipe(takeUntil(this.destroyed$));
    const summary$ = click$.pipe(
      map((v) => 1),
      scan((pre, current, index) => pre + current, 0),
      debounceTime(1000)
    );
    const count$ = click$.pipe(
      takeUntil(click$.pipe(debounceTime(1000))),
      count(),
      repeat()
    );
    zip(count$, summary$).subscribe({
      next: (data) => {
        console.log(`单次数量 :${data[0]}, 总计 :${data[1]}`);
      },
    });
  }

  initInputHandle(){
    const input$ = fromEvent(this.input.nativeElement,'input');
    this.inputText$ = input$.pipe(
      map(v=>this.InputTextbinding),
      debounceTime(500)
    )
  }
}
