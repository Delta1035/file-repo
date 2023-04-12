import { map, race, timer } from "rxjs";


const t1 = timer(0,1000).pipe(map(v=>v+'a'));
const t2 = timer(0,500).pipe(map(v=>v+'b'));
race(t1,t2).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)