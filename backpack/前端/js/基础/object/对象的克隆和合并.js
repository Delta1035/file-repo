/**
 * 浅层复制
 * 1. object.assgin(target,[source1,source2])
 * 2. {...target} spread 展开运算符
 * 3. 采用现有的实现，例如 lodash 库的 _.cloneDeep(obj)。
 * 4. JSON.stringify() 但是 对于日期,函数,正则等无法复制
 */

 const person = {
    isHuman: false,
    printIntroduction: function() {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
  };
  
  const me = Object.create(person);
  console.log(me);
  me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
  me.isHuman = true; // inherited properties can be overwritten
  
  me.printIntroduction();
  // expected output: "My name is Matthew. Am I human? true"