"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_ioc_1 = require("container-ioc");
var container = new container_ioc_1.Container();
container.register([
    { token: 'IConfig', useValue: {} }
]);
var app = container.resolve('IConfig');
//# sourceMappingURL=use-value.js.map