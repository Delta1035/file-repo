import { of, tap } from "rxjs";

of(1,2,3)
.pipe(
    tap()
)
.subscribe(
    {
        next:console.log
    }
)