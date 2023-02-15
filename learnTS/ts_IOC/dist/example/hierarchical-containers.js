"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_ioc_1 = require("container-ioc");
/*
    If a container can't find a value within itself, it will look it up in ascendant containers.
    There a 3 ways to set a parent for a container:
 */
var grandParentContainer = new container_ioc_1.Container();
// 1.
var parentContainer = grandParentContainer.createChild();
// 2.
var childContainer = new container_ioc_1.Container();
childContainer.setParent(parentContainer);
// 3.
var deepNestedContainer = new container_ioc_1.Container({
    parent: childContainer
});
grandParentContainer.register([
    { token: 'IConfig', useValue: {} }
]);
deepNestedContainer.resolve('IConfig');
//# sourceMappingURL=hierarchical-containers.js.map