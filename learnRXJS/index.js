import { from, range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// range(1, 200)
//     .pipe(
//         filter(x => x % 2 === 1),
//         map(x => x + x)
//     )
//     .subscribe(x => console.log(x));

import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});
console.log('just after subscribe');