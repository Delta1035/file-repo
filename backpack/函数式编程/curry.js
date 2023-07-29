function rule(age){
    return function min(value){
        return age > value
    }
}

console.log(rule(3)(4));
console.log(rule(2)(4));
console.log(rule(1)(4));
console.log(rule(5)(4));