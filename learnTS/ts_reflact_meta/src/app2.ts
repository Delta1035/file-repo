import "reflect-metadata";
const target = { name: "zhangsan" };
Reflect.defineMetadata("meta1", "metaValue1", target);
Reflect.defineMetadata("meta2", "metaValue2", target, "name");
const r1 = Reflect.getMetadata("meta1", target);
const r2 = Reflect.getMetadata("meta2", target, "name");
console.log(r1); // 'metaValue1'
console.log(r2); // 'metaValue2'

@Reflect.metadata("meta3", "metaValue3")
class C {
  @Reflect.metadata("input", "属性input")
  input = "123";
  constructor() {
    this.method = this.method;
  }
  @Reflect.metadata("meta4", "metaValue4")
  method() {}
}
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


@ParamTypes(String, Number)
class Guang {
  constructor(text, i) {
  }

  @Type(String)
  get name() { return "text"; }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  add(x:number, y:number):number {
    return x + y;
  }
}

let obj = new Guang("a", 1);

let paramTypes = Reflect.getMetadata("design:paramtypes", obj, "add"); 
const returnType = Reflect.getMetadata("design:returntype",obj,"add")
// [Number, Number] 
console.log(paramTypes,returnType);

