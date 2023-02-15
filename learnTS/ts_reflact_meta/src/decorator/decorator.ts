export const CONTROLLER_METADATA = 'controller';
export const ROUTE_METADATA = 'method';
export const PARAM_METADATA = 'param';
export type HttpMethod = 'get' | 'post' | 'put'
export function Controller(path = ''):ClassDecorator{
    return (target:Function) =>{
        Reflect.defineMetadata(CONTROLLER_METADATA,path,target);
    }
}

export function createMethodDecorator(method:HttpMethod = 'get'){
    return (path = '/'):MethodDecorator =>{
        return (target:Object,name:string,descriptor:any)=>{
            // descriptor.value 是target的一个属性名
            Reflect.defineMetadata(ROUTE_METADATA,{type:method,path},descriptor.value)
        }
    }
}

export function createParamDecorator(type:any){
    
}