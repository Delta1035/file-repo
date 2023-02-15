"use strict";
function f(a, b) {
    if (typeof a === 'string') {
        return a + ':' + b; // no error but b can be number!
    }
    else {
        return a + b; // error as b can be number | string
    }
}
f(2, 3); // Ok
// f(1, 'a'); // Error
// f('a', 2); // Error
f('a', 'b'); // Ok
