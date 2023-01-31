/*
 * @Author: Delta_Zheng Delta_Zheng@wistronits.com
 * @Date: 2023-01-31 13:49:22
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-01-31 14:05:38
 * @FilePath: \nodejs\basic\call.ts
 * @Description:
 *
 */
Function.prototype.call = function (context, ...args) {
  console.log("call");
  let cxt = context || window;
  let func = Symbol();
  cxt[func] = this;
  args = args ? args : [];
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
};
window.name = "张三";
Reflect.set(window, "age", 12);
function test(name: string, age: number) {
  //@ts-ignore
  this.name = name;
  //@ts-ignore
  this.age = age;
  //@ts-ignore
  console.log(this.name);
  //@ts-ignore
  console.log(this.age);
}
test("1", 11);
