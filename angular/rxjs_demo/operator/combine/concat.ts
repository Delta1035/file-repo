import { concat, of } from "rxjs";

const s1$ = of(1, 2, 3);
const s2$ = of(4, 5, 6);
const s3$ = of(7, 8, 9);
concat(s1$, s2$).subscribe({
  next: (data) => {
    console.log(data);
  },
});
