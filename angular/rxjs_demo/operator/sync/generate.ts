import { generate } from "rxjs";

generate(
  0,
  (x) => x < 3,
  (x) => x + 1,
  (x) => x
).subscribe({
  next: (data) => {
    console.log(data);
  },
});
