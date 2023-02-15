"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var a;
(function (a) {
    //当装饰器作为修饰类的时候，会把构造器传递进去
    function addNameEat(constructor) {
        constructor.prototype.name = "hello";
        constructor.prototype.eat = function () {
            console.log("eat");
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            addNameEat
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(a || (a = {}));
var b;
(function (b) {
    //还可以使用装饰器工厂 这样可以传递额外参数
    function addNameEatFactory(name) {
        return function (constructor) {
            constructor.prototype.name = name;
            constructor.prototype.eat = function () {
                console.log("eat");
            };
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            addNameEatFactory("hello")
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(b || (b = {}));
var c;
(function (c) {
    //还可以替换类,不过替换的类要与原类结构相同
    function enhancer(constructor) {
        return /** @class */ (function () {
            function class_1() {
                this.name = "jiagou";
            }
            class_1.prototype.eat = function () {
                console.log("吃饭饭");
            };
            return class_1;
        }());
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(c || (c = {}));
var e;
(function (e) {
    function dec(target, key, descriptor) {
        console.log('target=>', target, 'key=>', key, 'descriptor=>', descriptor);
    }
    var Demo = /** @class */ (function () {
        function Demo() {
        }
        Object.defineProperty(Demo.prototype, "demo3", {
            // target -> Demo.prototype
            // key -> 'demo3'
            // descriptor -> PropertyDescriptor类型
            get: function () {
                return 'demo3';
            },
            enumerable: false,
            configurable: true
        });
        // target -> Demo.prototype
        // key -> 'method'
        // descriptor -> PropertyDescriptor类型
        Demo.prototype.method = function () { };
        // target -> Demo.prototype
        // key -> 'demo1'
        // descriptor -> undefined
        // @dec
        // demo1: string;
        // target -> Demo
        // key -> 'demo2'
        // descriptor -> PropertyDescriptor类型
        // @dec
        Demo.demo2 = 'demo2';
        __decorate([
            dec
        ], Demo.prototype, "demo3", null);
        return Demo;
    }());
})(e || (e = {}));
