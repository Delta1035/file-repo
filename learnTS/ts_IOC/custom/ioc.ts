import { ReflectiveInjector, Injector } from "@angular/core";
import { Arms, Head, Robot } from "./Robot";

// const injector = ReflectiveInjector.resolveAndCreate([
//     Robot,
//     Head,
//     Arms
// ])

const injector = Injector.create([
  { provide: Robot, useClass: Robot },
  { provide: Head, useClass: Head },
  { provide: Arms, useClass: Arms },
]);
console.log(injector);
