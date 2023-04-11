import { map, merge, timer } from "rxjs";

const t1$ = timer(0,1000).pipe(map(x=>x+"a"));
const t2$ = timer(500,1000).pipe(map(x=>x+"b"));
// 数据先到先出来
merge(t1$,t2$).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)