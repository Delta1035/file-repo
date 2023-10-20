import { Observable } from "rxjs";
const one$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next(2);
    subscriber.complete();
  });
  subscriber.next(1);
  subscriber.next(1);
  subscriber.next(1);
  subscriber.next(1);
});
one$.subscribe({
  next: (data) => {
    console.log(data);
  },
  complete: () => {
    console.log("done");
  },
});
