import { of, startWith, timer } from "rxjs";

timer(0, 1000)
  .pipe(startWith(3,4,5))
  .subscribe({
    next: (data) => {
      console.log(data);
    },
  });
