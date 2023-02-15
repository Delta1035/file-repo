import "reflect-metadata";

@Reflect.metadata("key1", "value1")
class C {
  @Reflect.metadata('key3','value3')
  input = "输入";

  @Reflect.metadata("key2", "value2")
  method(str: string, num: number): string {
    return str + num;
  }
}

const c1 = new C();
const v2Type = Reflect.getMetadata("design:type", c1, "method"); // Function()
const v2Paramtypes = Reflect.getMetadata("design:paramtypes", c1, "method"); // [String(),Number()]
const v2Returntype = Reflect.getMetadata("design:returntype", c1, "method"); // String()
const v2 = Reflect.getMetadata("key2", c1, "method"); // 方法上的元数据需要在类的实例上获取

console.log(v2Type);
console.log(v2Paramtypes);
console.log(v2Returntype);
console.log(v2); // value2

const v3Type = Reflect.getMetadata("design:type", c1, "input"); // Object()
const v3Paramtypes = Reflect.getMetadata("design:paramtypes", c1, "input"); // undefined
const v3Returntype = Reflect.getMetadata("design:returntype", c1, "input"); // undefined
const v3 = Reflect.getMetadata('key3',c1,'input')
console.log(v3Type);
console.log(v3Paramtypes);
console.log(v3Returntype);
console.log(v3); // value3
