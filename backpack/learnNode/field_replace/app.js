const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const src = path.resolve(__dirname, "src");
const local = path.resolve(__dirname, "local");
function isDir(str) {
  return fs.existsSync(str) && fs.statSync(str).isDirectory();
}
function isFile(str) {
  return fs.existsSync(str) && fs.statSync(str).isFile();
}
function readFile(src) {
  const fileContent = fs.readFileSync(src,{encoding:'utf-8'});
  const fileName = src.replace(`${path.dirname(src)}\\`,'');
  return {
    fileContent,fileName
  }
}
function writeFile(fileName,filePath){

}
function _ToCal(str) {
  return str.replace(/_(\w{1})/g, function ($1, $2) {
    return $2.toUpperCase();
  });
}

function readModal(src) {
  const res = readFile(src);
  const vars = new Map();
  if (res instanceof Array) {
    for (const iterator of res) {
      const arr = iterator.split("\n");
      for (const item of arr) {
        const match = item.match(/([^\s?:]*)\?*:.*/);
        if (match?.[1]) {
          const to = _ToCal(match?.[1]);
          vars.set(match[1], to);
        }
      }
    }
  }
  return vars;
}

function replaceFile(fileStrList, replaceMap) {
  fileStrList.forEach((file) => {
    replaceMap.forEach((oldKey, newKey) => {
      file[0].replaceAll(oldKey, newKey);
    });
  });
}

function resolveFile(src){
  if (isDir(src)) {
    const pathList = fs.readdirSync(src);
    pathList.forEach((_src) => {
      const filePath = path.resolve(src, _src);
      resolveFile(filePath);
    });
  } else if (isFile(src)) {
    const {fileName,fileContent} = readFile(src);
    console.log(fileName);
  }
}

function main(){
  resolveFile(src)
}

main();

function getAllFile(src){
   const list = []
}

getAllFile(src)