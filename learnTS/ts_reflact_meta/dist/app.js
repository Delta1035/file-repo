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
let C = class C {
    constructor() {
        this.input = "输入";
    }
    method(str, num) {
        return str + num;
    }
};
__decorate([
    Reflect.metadata('key3', 'value3'),
    __metadata("design:type", Object)
], C.prototype, "input", void 0);
__decorate([
    Reflect.metadata("key2", "value2"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", String)
], C.prototype, "method", null);
C = __decorate([
    Reflect.metadata("key1", "value1")
], C);
const c1 = new C();
const v2Type = Reflect.getMetadata("design:type", c1, "method"); // Function()
const v2Paramtypes = Reflect.getMetadata("design:paramtypes", c1, "method"); // [String(),Number()]
const v2Returntype = Reflect.getMetadata("design:returntype", c1, "method"); // String()
const v2 = Reflect.getMetadata("key2", c1, "method"); // 方法上的元数据需要在类的实例上获取
console.log(v2Type);
console.log(v2Paramtypes);
console.log(v2Returntype);
console.log(v2);
const v3Type = Reflect.getMetadata("design:type", c1, "input"); // Object()
const v3Paramtypes = Reflect.getMetadata("design:paramtypes", c1, "input"); // undefined
const v3Returntype = Reflect.getMetadata("design:returntype", c1, "input"); // undefined
const v3 = Reflect.getMetadata('key3', c1, 'input');
console.log(v3Type);
console.log(v3Paramtypes);
console.log(v3Returntype);
console.log(v3);
//# sourceMappingURL=app.js.map