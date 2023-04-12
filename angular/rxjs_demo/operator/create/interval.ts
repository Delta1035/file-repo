import { interval } from "rxjs";
const i = interval(1000);
i.subscribe({
  next: (data) => {
    console.log("a", data);
  },
});

setTimeout(() => {
  i.subscribe({
    next: (data) => {
      console.log("b", data);
    },
  });
}, 1500);
