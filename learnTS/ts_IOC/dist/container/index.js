"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TService = exports.TApplication = void 0;
var container_ioc_1 = require("container-ioc");
var application_1 = require("./application");
var service_1 = require("./service");
exports.TApplication = Symbol("IApplication");
exports.TService = Symbol("IService");
var container = new container_ioc_1.Container();
container.register([
    { token: exports.TApplication, useClass: application_1.Application },
    { token: exports.TService, useClass: service_1.Service },
]);
console.log('container', container);
//# sourceMappingURL=index.js.map