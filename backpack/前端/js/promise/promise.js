const Pending = 'pending';
const Fulfilled = 'fulfilled';
const Rejected = 'rejected';
let context;
class MyPromise {
    STATUS = Pending; //初始状态
    VALUE = undefined; // resolve 传来的值
    REASON = undefined; // reject 传来的值
    successCallbackList = []; // 保存成功的回调 有可能为多次then调用
    failCallbackList = []; // 保存失败的回调 有可能为多次then调用
    constructor(executor) {
        context = this;
        executor(this.resolve, this.reject);// 如果executor 函数报错 直接执行reject
    }

    resolve(value) {
        if (this.STATUS !== Pending) return;
        this.STATUS = Fulfilled;
        this.VALUE = value;
        while (this.successCallbackList.length) this.successCallbackList.shift()(value);
    }

    reject(reason) {
        if (this.STATUS !== Pending) return;
        this.STATUS = Rejected;
        this.REASON = reason;
        while (this.failCallbackList.length) this.failCallbackList.shift()(reason);

    }

    // then 会接收1-2个回调函数 , 将resolve 和 reject的结果传递给回调函数
    // 如果状态是成功 则执行成功的回调函数, 如果状态是失败,则执行失败的回调函数
    then(successCallback, failCallback) {
        if (this.STATUS === Fulfilled) {
            successCallback(this.VALUE);
        } else if (this.STATUS === Rejected) {
            failCallback(this.REASON);
        } else {
            // 存储成功和失败的回调 处理异步问题
            this.successCallbackList.push(successCallback);
            this.failCallbackList.push(failCallback);
        }

        return new MyPromise((resolve) => {
            // resolve('test')
            console.log('form then', this, context);
        })
    }
}

module.exports = MyPromise;