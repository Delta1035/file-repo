
export function Inject(id?:string):PropertyDecorator{
    return (target:Object,propertyKey:string|symbol)=>{
        // 获取 当前类上的元数据 属性
        const Dependency = Reflect.getMetadata("design:type",target,propertyKey);

    }
}