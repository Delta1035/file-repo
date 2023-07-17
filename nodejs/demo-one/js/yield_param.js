function* gen() {
    // 向外部代码传递一个问题并等待答案
    let result = yield "2 + 2 = ?"; // (*)
  
    console.log(result);
  }
  
  let generator = gen();
  
  let question = generator.next().value; // <-- yield 返回的 value
  
  generator.next(4);
  console.log(question);
  generator.next(4);
  console.log(question);