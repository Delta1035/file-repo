function makeUser() {
    return {
      name: "John",
      ref: this
    };
  }
  
  let user = makeUser();
  
//   console.log( user.ref.name ); // 结果是什么？