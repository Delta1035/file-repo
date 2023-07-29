/**
 * injector 应该是一个单体,确保各个地方使用有相同的功能
 */

var injector = {
    dependencies: {},
    register: function (key, value) {
        this.dependencies[key] = value;
    },
    /**
     * 处理依赖
     * @param {*} deps  依赖项组成的数组
     * @param {*} func  
     * @param {*} scope  
     */
    resolve: function (deps, func, scope) {
        var args = [];
        var d;
        for (var i = 0; i < deps.length; i++) {
            d = deps[i];
            if (this.dependencies[d]) { //如果依赖列表里面存在用户所需的依赖项
                args.push(this.dependencies[d]); //将改依赖项注入参数列表
            } else {
                throw new Error('can not resolve' + d);
            }
        }

        return function () {
            var func, deps, scope, args = [], self = this;
            func = arguments[1];
            deps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
            scope = arguments[2] || {};
        }
    }
}

var service = function() {
    return { name: 'Service' };
}
var router = function() {
    return { name: 'Router' };
}
var doSomething = injector.resolve(['service', 'router'], function(service, router, other) {
    expect(service().name).to.be('Service');
    expect(router().name).to.be('Router');
    expect(other).to.be('Other');
});
doSomething("Other");