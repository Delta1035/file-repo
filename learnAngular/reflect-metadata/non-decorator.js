var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "reflect-metadata";
import { Component } from "./decorator/decorator";
let Example = class Example {
};
Example = __decorate([
    Reflect.metadata("key2", "使用装饰器定义的元数据")
], Example);
Reflect.defineMetadata("key1", "value1", Example); // 定义类元数据
const value1 = Reflect.getMetadata("key1", Example);
console.log(value1);
class HttpClient {
}
let AppComponent = class AppComponent {
    constructor(http) {
        this.http = http;
        this.method = () => {
            this.name = '张三';
        };
        this.method();
    }
    func() {
        this.name = 'func';
    }
};
AppComponent = __decorate([
    Component({
        template: '<div>这是一个div</div>',
        style: `div{ color:red }`
    }),
    __metadata("design:paramtypes", [HttpClient])
], AppComponent);
