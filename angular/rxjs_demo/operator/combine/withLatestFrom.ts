import { map, timer, withLatestFrom } from "rxjs";

const timer1$ = timer(0, 2000).pipe(map((v) => 100 * v));

const timer2$ = timer(500, 1000);
// 数据流有timer1$触发，结合timer2$最新的数据
timer1$.pipe(withLatestFrom(timer2$, (a, b) => a + b)).subscribe({
  next: (data) => {
    console.log(data);
  },
});
// 1
// 100 + 012
