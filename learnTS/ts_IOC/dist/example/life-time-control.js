"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_ioc_1 = require("container-ioc");
/*
    By default, containers resolve singletons when using useClass and useFactory.
    Default life time for all items in a container can be set by passing an option object to it's contructor with **defailtLifeTime** attribute.
    Possible values: LifeTime.PerRequest (resolves instances) and LifeTime.Persistent (resolves singletons);
*/
var container = new container_ioc_1.Container({
    defaultLifeTime: container_ioc_1.LifeTime.PerRequest
});
/*
    You can also specify life time individually for each item in a container by specifying lifeTime attribute.
*/
var ServiceA = /** @class */ (function () {
    function ServiceA() {
    }
    ServiceA = __decorate([
        (0, container_ioc_1.Injectable)()
    ], ServiceA);
    return ServiceA;
}());
/* With classes */
container.register([
    {
        token: 'ISerivceA',
        useClass: ServiceA,
        lifeTime: container_ioc_1.LifeTime.PerRequest
    }
]);
/* With factories */
container.register([
    {
        token: 'IServiceB',
        useFactory: function () {
            return {
                serve: function () {
                    return;
                }
            };
        },
        lifeTime: container_ioc_1.LifeTime.Persistent
    }
]);
var service1 = container.resolve('IServiceA');
var service2 = container.resolve('IServiceB');
//# sourceMappingURL=life-time-control.js.map