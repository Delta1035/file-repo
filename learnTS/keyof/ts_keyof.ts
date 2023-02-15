type Person = {
    name: string;
    age: number;
}
type PersonKey = keyof Person;  // PersonKey得到的类型为 'name' | 'age'  返回一个联合类型

var p:PersonKey = 'name';
var d:PersonKey = 'age';