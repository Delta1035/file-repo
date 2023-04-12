
// 类似promise.all

import { forkJoin, range, timer } from "rxjs";

const t1 = range(0,1000);
const t2 = range(500,1500);
forkJoin([t1,t2]).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)