import { range } from "rxjs";

range(0,100).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)
