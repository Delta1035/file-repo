import { of, repeat } from "rxjs";

of(1,2,3).pipe(
    repeat(3)
).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)