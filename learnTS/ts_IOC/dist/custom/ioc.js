"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Robot_1 = require("./Robot");
// const injector = ReflectiveInjector.resolveAndCreate([
//     Robot,
//     Head,
//     Arms
// ])
var injector = core_1.Injector.create([
    { provide: Robot_1.Robot, useClass: Robot_1.Robot },
    { provide: Robot_1.Head, useClass: Robot_1.Head },
    { provide: Robot_1.Arms, useClass: Robot_1.Arms },
]);
console.log(injector);
//# sourceMappingURL=ioc.js.map