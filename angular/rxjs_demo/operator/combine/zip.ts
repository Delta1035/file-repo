import { map, of, timer, zip } from "rxjs";

const o1$ = of(1,2,3);
const o2$ = of('a','b','c','d');
const t1$ = timer(0,1000);
// zip(o1$,o2$).subscribe(
//     {
//         next:data=>{
//             console.log(data)
//         }
//     }
// )

zip(o2$,t1$).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)