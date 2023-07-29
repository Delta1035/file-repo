function memoize(fn){
    let cache = {};
    let key = JSON.stringify(fn);
    console.log('start');
    return function(){
        if(cache[key]){
            console.log('缓存存在');
            return cache[key];
        }else{
            console.log('没有缓存');
            cache[key] = fn.apply(fn,arguments);
            // return cache[key];
        }
    //    return cache[key] = cache[key] || fn.apply(fn,arguments);
    }
}

const result = memoize(function(a,b){
    return a + b;
});

console.log(result(1,2));
console.log(result(1,2));
console.log(result(1,2));
console.log(result(1,2));
console.log(result(1,2));