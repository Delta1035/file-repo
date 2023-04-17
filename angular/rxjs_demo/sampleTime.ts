import { fromEvent, sampleTime } from "rxjs";

const clicks = fromEvent(document, "click");
const result = clicks.pipe(sampleTime(1000));

result.subscribe((x) => console.log(x));
