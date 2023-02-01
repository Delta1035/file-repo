function* gSequence() {
  console.log("我执行了");
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

// gSequence被运行时不会运行代码,而是返回一个generator object对象
// 当执行next方法被调用时,会恢复执行知道最近的yield语句
// 然后函数再次暂停,将yielded值返回到外部
const gv = gSequence();
console.log(gv.next());
console.log(gv.next());
console.log(gv.next());
console.log(gv.next());
console.log(gv.next());
// for (let i of gv) {
//   console.log(i); // 1 2 3 会忽略return的结果
// }
