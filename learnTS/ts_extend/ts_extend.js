"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function makeCustomer(u) {
    return __assign(__assign({}, u), { id: u.id, kind: 'customer' });
}
// extends 的含义是类型约束， T 受到 User的约束，必须包含User 中规定的类型，但是 T 类型比User类型范围更广泛
