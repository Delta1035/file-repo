const object = {
  name: "delta",
  age: 18,
  (Symbol.iterator):function(){
    
  }
};
// Reflect.setPrototypeOf(object, globalThis);
// for (let key in object) {
//   console.log(key);
// }
const target = {};
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
map.set("key3", "value3");
for (let v of map) {
  console.log(v);
}
