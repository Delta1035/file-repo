/**
 * injector 应该是一个单体,确保各个地方使用有相同的功能
 */

var injector = {
    dependencies:{},
    register:function(key,value){
        this.dependencies[key] = value;
    },
    /**
     * 处理依赖
     * @param {*} deps  依赖项组成的数组
     * @param {*} func  
     * @param {*} scope  
     */
    resolve:function(deps,func,scope){
        var args = [];
        var d;
        for(var i=0;i<deps.length;i++){
            d = deps[i];
            if(this.dependencies[d]){//如果依赖列表里面存在用户所需的依赖项
                args.push(this.dependencies[d]);//将改依赖项注入参数列表
            }else{
                throw new Error('can not resolve' + d);
            }
        }

        return function(){
            //scope 目标作用域;
            //apply 传递func接收的参数变量
            //参数结构:
            //[dep1,dep2,dep3,arg1,arg2,arg3]
            //arg1,arg2,arg3 是func(arg1,arg2,arg3)的参数
            func.apply(scope || {},args.concat(Array.prototype.slice.call(arguments,0)))
        }
    }
}