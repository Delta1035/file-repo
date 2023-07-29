const a = {
    name:'法外狂徒',
    age:12,
    [Symbol.iterator]:function *(){
        for(const key in this){
            yield this[key]
        }
    }
}

for(const value of a){
    console.log(value);
}