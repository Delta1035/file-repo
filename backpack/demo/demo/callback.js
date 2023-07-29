function foo (cd){//cd 相当于 callback函数
    setTimeout((cd)=>{
        let _name = '张三';
        cd(_name);//执行cd   console.log(_name);  => '张三’
    },1000,cd) //cd 传入异步任务里面
}
function callback(val){
    console.log(val);
}
foo(callback);