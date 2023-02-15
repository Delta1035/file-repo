import "reflect-metadata"

@Reflect.metadata('meta1','来自元数据1的值')
class C {
    // @Reflect.metadata('meta2','来自元数据2的值')
    // method(){}
    // @Reflect.metadata('meta3','来自元数据3的值')
    // name;
    @Reflect.metadata('meta-key','来自age')
    age = 12;
    constructor(){
    }
    sex='男'
    arrow = ()=>{
        return '这是箭头函数'
    }
}

const r1 = Reflect.getMetadata('meta1',C);
const r2 = Reflect.getMetadata('meta2',C);
// const r3 = Reflect.getMetadata('meta2',C,'method');
const r3 = Reflect.getMetadata('meta3',C,'name')
console.log(r1,r2,r3);
