import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, count, fromEvent, map, scan, tap } from 'rxjs';

@Component({
  selector: 'app-relay-subject',
  templateUrl: './relay-subject.component.html',
  styleUrls: ['./relay-subject.component.scss'],
})
export class RelaySubjectComponent implements OnInit, AfterViewInit {
  @ViewChild('btn1')
  btn1!: ElementRef<HTMLButtonElement>;
  @ViewChild('btn2')
  btn2!: ElementRef<HTMLButtonElement>;

  btn1$!: Observable<Event>;
  btn2$!: Observable<Event>;
  count = 0;
  doubleClickDuration = 300;
  debounce$!: Observable<Event>;
  clickLimit$!: Observable<Event[]>;
  bufferGats$!: Observable<unknown>;

  sigleCount = 0;
  summaryCount = 0;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initClickCheck();
    this.initBtn2();
  }
  init() {}

  initClickCheck() {
    /**
     * 1. 以300ms时间间隔内的点击次数判断是单击还是双击
     * 2. 第一次点击之后开始计时，若再300ms以内再次触发点击事件，视为双击
     * 3. 最终结果是以第一次点击之后300ms作为最终结束时间。
     * 4，拆解过程：
     * 一个事件触发源头，click事件，
     * 一个定时器，由点击事件开始，由本身的时间结束作为结束，
     * 一个计数器，记录点击事件的次数，没次定时器结束之后都清零。
     */
    // console.log('start');
    // this.btn1$.pipe();
    // this.btn1$ = fromEvent(this.btn1.nativeElement, 'click');
    // const t$ = this.btn1$.pipe(
    // )
    // const timer$:Observable<Event[]> = this.btn1$.pipe(
    //   switchMap(v=>{
    //     return count()
    //   }),
    //   bufferWhen(()=>timer(500))
    // );
    //   timer$.subscribe(
    //     {
    //       next:data=>{
    //         console.log('bufferWhen',data);
    //       }
    //     }
    //   )
    // this.btn1$
    //   .pipe(
    //     tap((v) => console.log),
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       console.log('data', data);
    //     },
    //   });
    // this.debounce$ = this.btn1$.pipe(debounceTime(this.doubleClickDuration));
    // this.clickLimit$ = this.btn1$.pipe(bufferCount(2));
    // this.bufferGats$ = race(this.debounce$, this.clickLimit$).pipe(
    //   first(),
    //   repeat()
    // );
    // this.btn1$
    //   .pipe(buffer(this.bufferGats$))
    //   .pipe()
    //   .subscribe({
    //     next: (data) => {
    //       console.log('data', data);
    //     },
    //   });
  }

  handleClick() {
    console.log('click');
  }

  initBtn2() {
    this.btn2$ = fromEvent(this.btn2.nativeElement, 'click');
    const s = this.btn2$
      .pipe(
        map(() => 1),
        scan((pre, current) => pre + current, 0),
        tap(console.log),
        // debounceTime(500),
        count()
      )
      .subscribe({
        next: (data) => console.log('count', data),
      });
  }
}
