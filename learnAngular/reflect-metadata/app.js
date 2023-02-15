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
        // @Reflect.metadata('meta2','来自元数据2的值')
        // method(){}
        // @Reflect.metadata('meta3','来自元数据3的值')
        // name;
        this.age = 12;
        this.sex = '男';
        this.arrow = () => {
            return '这是箭头函数';
        };
    }
};
__decorate([
    Reflect.metadata('meta-key', '来自age'),
    __metadata("design:type", Object)
], C.prototype, "age", void 0);
C = __decorate([
    Reflect.metadata('meta1', '来自元数据1的值'),
    __metadata("design:paramtypes", [])
], C);
const r1 = Reflect.getMetadata('meta1', C);
const r2 = Reflect.getMetadata('meta2', C);
// const r3 = Reflect.getMetadata('meta2',C,'method');
const r3 = Reflect.getMetadata('meta3', C, 'name');
console.log(r1, r2, r3);
