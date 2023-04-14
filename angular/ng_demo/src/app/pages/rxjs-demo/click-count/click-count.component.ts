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
  count,
  debounceTime,
  filter,
  fromEvent,
  map,
  of,
  repeat,
  scan,
  takeUntil,
  throttleTime,
  timer,
  withLatestFrom,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-click-count',
  templateUrl: './click-count.component.html',
  styleUrls: ['./click-count.component.scss'],
})
export class ClickCountComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroyed$: Subject<unknown> = new Subject();
  inputText$!: Observable<string>;
  InputTextbinding!: string;
  @ViewChild('btn')
  btn!: ElementRef<HTMLButtonElement>;

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  @ViewChild('input2')
  input2!: ElementRef<HTMLInputElement>;
  originData = of([
    '3546583489546045609234893240954954345430921323',
    '17890123546583489546045609234893240954954345430921323',
    '1234567890123546583489546045609234893240954954345430921323',
    '190123546583489546045609234893240954954345430921323',
    '7890123546583489546045609234893240954954345430921323',
    '1234567890123546583489546045609234893240954954345430921323',
    '7890123546583489546045609234893240954954345430921323',
    '0123546583489546045609234893240954954345430921323',
    '1567890123546583489546045609234893240954954345430921323',
    '190123546583489546045609234893240954954345430921323',
    '9012546045609234893240954954345430921323',
    '13546583489546045609234893240954954345430921323',
    '1283489546045609234893240954954345430921323',
    '123459546045609234893240954954345430921323',
    '1546583489546045609234893240954954345430921323',
    '1234567890123546583489546045609234893240954954345430921323',
    '13489546045609234893240954954345430921323',
    '3489546045609234893240954954345430921323',
    '123609234893240954954345430921323',
    '125609234893240954954345430921323',
    '17890123546583489546045609234893240954954345430921323',
    '234893240954954345430921323',
    '3489546045609234893240954954345430921323',
    '583489546045609234893240954954345430921323',
    '9546045609234893240954954345430921323',
    '6045609234893240954954345430921323',
    '6045609234893240954954345430921323',
    '045609234893240954954345430921323',
    '045609234893240954954345430921323',
    '3489546045609234893240954954345430921323',
  ]);
  data = '';

  @ViewChild('btn2')
  btn2!: ElementRef<HTMLButtonElement>;

  @ViewChild('btn3')
  btn3!: ElementRef<HTMLButtonElement>;
  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initClickHandle();
    this.initInputHandle();
    this.initInput2handle();
    this.initrandomCount();
  }

  initClickHandle(): void {
    const btn = this.btn.nativeElement;
    const click$ = fromEvent(btn, 'click').pipe(takeUntil(this.destroyed$));
    const summary$ = click$.pipe(
      map((): number => 1),
      scan((pre, current): number => pre + current, 0),
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

  initInputHandle() {
    const input$ = fromEvent(this.input.nativeElement, 'input');
    this.inputText$ = input$.pipe(
      map(() => this.InputTextbinding),
      throttleTime(500)
    );
  }

  initInput2handle() {
    const data$ = of(this.data.split(''));
    const input2$ = fromEvent(this.input2.nativeElement, 'input');
    input2$
      .pipe(
        map((e) => {
          if (e.target instanceof HTMLInputElement) {
            return e.target.value;
          }
          return e;
        }),
        filter((v) => {
          if (typeof v === 'string') {
            return v.length > 2;
          }
          return false;
        }),
        debounceTime(500)
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  initrandomCount() {
    const btn3$ = fromEvent(this.btn3.nativeElement, 'click');
    btn3$
      .pipe(
        withLatestFrom(
          timer(0, 500).pipe(
            map(() => 1),
            scan((pre, c) => c + pre, 0)
          )
        ),
        map((v) => v[1])
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }
}
