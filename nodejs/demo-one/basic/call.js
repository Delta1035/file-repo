/*
 * @Author: Delta_Zheng Delta_Zheng@wistronits.com
 * @Date: 2023-01-31 13:49:22
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-01-31 14:17:16
 * @FilePath: \nodejs\basic\call.js
 * @Description:
 *
 */
Function.prototype.mycall = function (context, ...args) {
  let cxt = context || window;
  let func = Symbol();
  cxt[func] = this;
  args = args ? args : [];
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
};

function test(name, age) {
  console.log("入参", name, age);
  return {
    name: this.name,
    age: this.age,
  };
}

console.log(test("1", 1));
console.log(test.call({ name: "2", age: 2 }, 1, 1));
console.log(test.mycall({ name: "2", age: 2 }, 1, 1));
