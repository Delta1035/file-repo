import { range } from "rxjs";
/**
 * param1 start number
 * param2 产生的数字数量
 */
range(0,100).subscribe(
    {
        next:data=>{
            console.log(data)
        }
    }
)
