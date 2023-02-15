const fs = require("fs");
const path = require("path");

const target_path = String.raw`E:\azure-i4.0\es7_update\pr_daily_report_ui\src\app\shared\service\es.prdaily.service.js`;
const test_path = String.raw`./test.ts`
const content = fs.readFileSync(target_path, { encoding: "utf-8" });
const test_content = fs.readFileSync(test_path, { encoding: "utf-8" });
// console.log(content);
function getArgs(func) {
  //匹配函数括号里的参数
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  //分解参数成数组
  return args
    .split(",")
    .map(function (arg) {
      //去空格和内联注释
      return arg.replace(/\/\*.*\*\//, "").trim();
    })
    .filter(function (args) {
      //确保没有undefineds
      return args;
    });
}

function getParams(arguments, keys) {
  const params = {};
  keys.forEach((key, index) => {
    Reflect.set(params, key, arguments[index]);
  });
  return params;
}

// function test(timestampFrom, timestampTo, lines, models, locations, smtsns) {
//   console.log(arguments, getArgs(test));
//   console.log({
//     ...getArgs(test),
//   });
// }

// test(1, 2, 3, 4);
test_content.
console.log(test_content);
