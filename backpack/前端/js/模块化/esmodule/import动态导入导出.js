//1. import 语句只能在声明了 type="module" 的 script 的标签中使用
//2. 无论是否声明了 strict mode ，导入的模块都运行在严格模式下。
//3. 类似函数的动态 import()，它不需要依赖 type="module" 的script标签
//4. script标签中使用nomudle属性可以兼容不支持esmodule的浏览器
//5. 动态import() 在按需加载时非常有用
// 6. import 静态加载更容易支持代码静态分析, 以及tree-shaking


// 用法: 
// import defaultExport from "module-name";
// import * as name from "module-name";
// import { export } from "module-name";
// import { export as alias } from "module-name";
// import { export1 , export2 } from "module-name";
// import { foo , bar } from "module-name/path/to/specific/un-exported/file";
// import { export1 , export2 as alias2 , [...] } from "module-name";
// import defaultExport, { export [ , [...] ] } from "module-name";
// import defaultExport, * as name from "module-name";
// import "module-name";
// var promise = import("module-name");//这是一个处于第三阶段的提案。

// import('./my-module.js').then(module=>{
//     console.log('动态导入',module);
// })
console.log('同步代码比上面的动态导入先执行');
let count = 1;
const btn = document.querySelector('#btn');
// btn.addEventListener('click',async function(){
//     console.log(count);
//     count ++;
//     if(count > 3){
//         await import('./my-module.js');
//     }
// })
const url = decodeURI(import.meta.url.toString())
console.log(url);
btn.addEventListener('click',async function(){
    // 只会加载一次, 不会重复加载
        await import('./my-module.js');
})