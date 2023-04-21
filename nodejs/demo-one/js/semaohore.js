/*
 * @Author: Delta_Zheng Delta_Zheng@wistronits.com
 * @Date: 2023-01-31 15:14:48
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-01-31 15:14:53
 * @FilePath: \nodejs\js\semaohore.js
 * @Description: 
 * 
 */
class Semaphore {
    constructor(available) {
        this.available = available;
        this.waiters = [];
        this._continue = this._continue.bind(this);
    }

    take(callback) {
        if (this.available > 0) {
            this.available--;
            callback();
        } else {
            this.waiters.push(callback);
        }
    }

    leave() {
        this.available++;
        if (this.waiters.length > 0) {
            process.nextTick(this._continue);
        }
    }

    _continue() {
        if (this.available > 0) {
            if (this.waiters.length > 0) {
                this.available--;
                const callback = this.waiters.pop();
                callback();
            }
        }
    }
}
let Semaphore = require('semaphore');
let semaphore = new Semaphore(2);
console.time('cost');
semaphore.take(function () {
    setTimeout(() => {
        console.log(1);
        semaphore.leave();
    }, 1000);
});
semaphore.take(function () {
    setTimeout(() => {
        console.log(1);
        semaphore.leave();
    }, 2000);
});
semaphore.take(function () {
    console.log(3);
    semaphore.leave();
    console.timeEnd('cost');
});