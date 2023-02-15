"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_ioc_1 = require("container-ioc");
var TSerivice = Symbol('IService');
var App = /** @class */ (function () {
    function App(service) {
        this.service = service;
    }
    App = __decorate([
        (0, container_ioc_1.Injectable)([TSerivice])
    ], App);
    return App;
}());
var container = new container_ioc_1.Container();
container.register([
    { token: App, useClass: App },
    { token: TSerivice, useValue: {} }
]);
var app = container.resolve(App);
//# sourceMappingURL=alternative-syntax.js.map