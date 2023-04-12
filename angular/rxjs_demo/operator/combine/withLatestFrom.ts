import { map, timer, withLatestFrom } from "rxjs";

const timer1$ = timer(0, 2000).pipe(map((v) => 100 * v));
// 0 100 200 300
const timer2$ = timer(500, 1000);
// 当timer1 发出0 的时候，timer2还没有发出
// 当timer2 发出0 1 还没发出2时， timer1发出了数据100， 此时结合两者带入公式 得到101
/**
 * 500 0
 * 1500 1
 * =========> 这个时间段timer1发出了100 => 101
 * 2500 2
 * 3500 3
 * =========> 这个时间段timer1发出了200 => 203
 * 4500 4
 * 5500 5
 * =========> 这个时间段timer1发出了300 => 305
 * 6500 6
 */

// 数据流有timer1$触发，结合timer2$最新的数据
timer1$.pipe(withLatestFrom(timer2$, (a, b) => a + b)).subscribe({
  next: (data) => {
    console.log(data);
  },
});
// 102
