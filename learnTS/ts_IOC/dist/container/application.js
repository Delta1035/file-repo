"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var container_ioc_1 = require("container-ioc");
var index_1 = require("./index");
var Application = /** @class */ (function () {
    function Application(service) {
        this.service = service;
    }
    Application.prototype.run = function () {
        this.service.serve();
    };
    Application = __decorate([
        (0, container_ioc_1.Injectable)(),
        __param(0, (0, container_ioc_1.Inject)(index_1.TService))
    ], Application);
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=application.js.map