
function once(fn){
    let flag = true;
    return function(){
        if(flag){
            fn.apply(this,arguments);
            flag = false;
        }
    }
}

const fn = once(function(value){
    console.log('我执行了'+value);
});
fn(1);
fn(2);
fn(3);
fn(4);