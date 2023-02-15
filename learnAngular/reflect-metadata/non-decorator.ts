import "reflect-metadata";
import { Component, Readonly } from "./decorator/decorator";
@Reflect.metadata("key2", "使用装饰器定义的元数据")
class Example {}
Reflect.defineMetadata("key1", "value1", Example); // 定义类元数据
const value1 = Reflect.getMetadata("key1", Example);
console.log(value1);

class HttpClient {
    age:number
}





@Component({
    template:'<div>这是一个div</div>',
    style:`div{ color:red }`
})
class AppComponent{
    // @Readonly({writable:false})
    name;
    constructor(private http:HttpClient){
        this.method();
    }
    method = ()=>{
        this.name = '张三'
    }

    func(){
        this.name = 'func'
    }
}
