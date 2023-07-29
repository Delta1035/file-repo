function greet(arg1, arg2, arg3) {
    console.log(arg1);
    console.log(arg2);
    console.log(arg3);
}
name = "张三"
age = 19
// 普通函数
greet(["I'm ", ". I'm ", " years old."], name, age)


// tag 函数
greet`I'm ${name}. I'm ${age} years old.`