// 如果可以给默认绑定指定一个全局对象和 undefined 以外的值，那就可以实现和硬绑定相
// 同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。

if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this;
        // 捕获所有 curried 参数
        var curried = [].slice.call(arguments, 1);
        var bound = function () {
            return fn.apply(
                (!this || this === (window || global)) ?
                    obj : this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}