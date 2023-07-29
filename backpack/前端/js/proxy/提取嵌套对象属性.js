let o = {
    person:{
        name:'张三'
    }
}

const {person:{name}} = o;
console.log(name);