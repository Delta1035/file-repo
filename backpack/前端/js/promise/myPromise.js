const PENDING = 'pending';
const FULFILED = 'fulfiled';
const REJECTED = 'rejected';
class MyPromise {
    value;// 任何合法的js值
    reason;// 表示promise被拒绝的原因
    status = PENDING;// 默认pending 状态

    constructor(fn){
        try {
        fn(this.resolve,this.reject);
        } catch (error) {// 当不传入fn执行内容时 可以处理错误
            this.reject(error)
        }
    }

    resolve(value){
        
    }

    reject(reason){

    }

    then(){

    }

    isFunction(target){
        return typeof target === 'function';
    }
}

const promise1 = new MyPromise();
console.log(promise1);