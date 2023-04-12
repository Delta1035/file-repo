import { Subject, interval, take } from "rxjs";
const subject1 = new Subject();
const tick$ = interval(1000).pipe(take(3));

tick$.subscribe(subject1);

subject1.subscribe(
    {
        next:data=>{
            console.log('out',data)
        }
    }
)

setTimeout(()=>{
    subject1.subscribe(
        {
            next:data=>{
                console.log('in',data)
            }
        }
    )
},1020)