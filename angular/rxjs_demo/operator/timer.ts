import { timer } from "rxjs";

timer(1,100).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)