function test(x:number):number;
function test(x:string):string;
function test(x:number|string):number|string{
    if(typeof x=== 'number'){
        return Number(x+x);
    }else if(typeof x=== 'string'){
        return x+x;
    }
}

console.log(test(1));
console.log(test('2'));

