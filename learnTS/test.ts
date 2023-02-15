let someValue:{name:string,length:number} = {
    name:'张三',
    length:10
};
// let str:string = someValue.length;

interface fn {
    (name:string,age:number):void
};
let f2:fn;
f2 = function(a:string){
    return 1
}

interface MyInterface {
    (name:string,age:number):string
}

let fn1:MyInterface ;
fn1 = function (b:string,c:string) {
    return 1
}


interface SearchFunc {
    (source: string, subString: string): boolean;
  }
let mySearch: SearchFunc;
mySearch = function(src: string) {
  let result = src.search('1');
  return 
}