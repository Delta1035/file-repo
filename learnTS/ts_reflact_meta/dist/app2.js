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
const target = { name: "zhangsan" };
Reflect.defineMetadata("meta1", "metaValue1", target);
Reflect.defineMetadata("meta2", "metaValue2", target, "name");
const r1 = Reflect.getMetadata("meta1", target);
const r2 = Reflect.getMetadata("meta2", target, "name");
console.log(r1); // 'metaValue1'
console.log(r2); // 'metaValue2'
let C = class C {
    constructor() {
        this.input = "123";
        this.method = this.method;
    }
    method() { }
};
__decorate([
    Reflect.metadata("input", "属性input"),
    __metadata("design:type", Object)
], C.prototype, "input", void 0);
__decorate([
    Reflect.metadata("meta4", "metaValue4"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], C.prototype, "method", null);
C = __decorate([
    Reflect.metadata("meta3", "metaValue3"),
    __metadata("design:paramtypes", [])
], C);
const r3 = Reflect.getMetadata("meta3", C);
const r4 = Reflect.getOwnMetadata("meta4", C, "method");
const r5 = Reflect.getOwnMetadata("input", C);
console.log(r3);
console.log(r4);
console.log(r5);
function Type(type) {
    return Reflect.metadata("design:type", type);
}
function ParamTypes(...types) {
    return Reflect.metadata("desing:paramtypes", types);
}
function ReturnType(type) {
    return Reflect.metadata("design:returntype", type);
}
let Guang = class Guang {
    constructor(text, i) {
    }
    get name() { return "text"; }
    add(x, y) {
        return x + y;
    }
};
__decorate([
    Type(String),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Guang.prototype, "name", null);
__decorate([
    Type(Function),
    ParamTypes(Number, Number),
    ReturnType(Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Guang.prototype, "add", null);
Guang = __decorate([
    ParamTypes(String, Number),
    __metadata("design:paramtypes", [Object, Object])
], Guang);
let obj = new Guang("a", 1);
let paramTypes = Reflect.getMetadata("design:paramtypes", obj, "add");
const returnType = Reflect.getMetadata("design:returntype", obj, "add");
// [Number, Number] 
console.log(paramTypes, returnType);
//# sourceMappingURL=app2.js.map