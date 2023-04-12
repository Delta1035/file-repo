import { combineAll, concatAll, interval, map, take } from "rxjs";

const ho$ = interval(1000).pipe(
  take(2),// 0 1 
  map((x) =>
    interval(1500).pipe( 
      map((y) => x + ":" + y),
      take(2) // 0 1
    )
  ),
  concatAll() // 00 01 10 11
).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
);
