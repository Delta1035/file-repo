const person = {};
Object.defineProperty(person,'lili',{
    get(){
        console.log('出發get方法');
        return 'get get get'
    },
    set(val){
        console.log('出發set方法');
        person['lili'] = val;
    }
})

console.log(person['lili']);;
person['lili'] = 999;
