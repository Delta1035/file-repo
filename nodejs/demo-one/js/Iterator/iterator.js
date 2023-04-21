let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]: function* () {
    for (let i = this.from; i <= this.to; i++) {
      console.log("作用域", i);
      yield i;
    }
  },
};
// for (let i of range) {
//   console.log(i);
// }

let range2 = {
  from: 1,
  to: 5,
  [Symbol.iterator]: function () {
    // const keys = Reflect.ownKeys(this);
    const keys = Object.keys(this);
    console.log(keys);
    return {
      current: this.from,
      last: this.from,
      next() {

        return {
          value: 1,
          done: false,
        };
      },
    };
  },
};
// 执行for of 首先会执行迭代器方法,然后会返回一个对象
// 循环返回, 知道对象的done:true.
for (let i of range2) {
  console.log(i);
}
