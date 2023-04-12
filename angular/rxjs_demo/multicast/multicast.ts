// RxJS v6+
import { interval, ReplaySubject } from "rxjs";
import { take, multicast, tap, mapTo } from "rxjs/operators";

// 每2秒发出值并只取前5个
const source = interval(2000).pipe(take(5));

// 使用 ReplaySubject 的示例
const example = source.pipe(
  // 因为我们在下面进行了多播，所以副作用只会调用一次
  tap((_) => console.log("Side Effect #2")),
  mapTo("Result Two!")
);
// 可以使用任何类型的 subject
const multi = example.pipe(multicast(() => new ReplaySubject(5)));
// 使用 subject 订阅 source
multi.connect();

setTimeout(() => {
  /*
   因为使用的是 ReplaySubject，订阅者会接收到 subscription 中的之前所有值。
   */
  const subscriber = multi.subscribe((val) => console.group(val));
}, 5000);
