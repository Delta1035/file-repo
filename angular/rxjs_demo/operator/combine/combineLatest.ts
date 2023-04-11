import { combineLatest, timer } from "rxjs";

const t1$ = timer(0,1000);
const t2$ = timer(500,1000);

combineLatest(t1$,t2$).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)