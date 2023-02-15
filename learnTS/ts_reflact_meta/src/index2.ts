
import 'reflect-metadata';
// function log(value:any){
//     console.log(value)
// }
// @Reflect.metadata('inClass', 'A')
// class Test {
//     @Reflect.metadata('inMethod', 'B')
//     public hello(): string {
//         return 'hello world';
//     }
// }

// console.log(Reflect.getMetadata('inClass', Test)); // 'A'
// console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'

// function ComponentDecorator():ClassDecorator {
//     return target => {
//         // console.log('target',target);

//         /**
//          * @param metadataKey — A key used to store and retrieve metadata.
//          * @param metadataValue — A value that contains attached metadata.
//          * @param target — The target object on which to define metadata.
//          */
//         Reflect.defineMetadata('classMetaData', 'a', target);
//     }
// }

// // function MethodDecorator(){
// //     return (target,key,descriptor)=>{
// //         Reflect.defineMetadata('MethodDecorator','b',target,key)
// //     }
// // }

// function methodDecorator(): MethodDecorator {
//     return (target, key, descriptor) => {
//       // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
//       Reflect.defineMetadata('methodMetaData', 'b', target, key);
//     };
//   }
// @ComponentDecorator()
// class MyComponent {

//     @methodDecorator()
//     someMethod() {}

//     // @MethodDecorator()
//     // output(){

//     // }

// }

// log(Reflect.getMetadata('classMetaData',MyComponent));
// log(Reflect.getMetadata('MethodDecorator',new MyComponent(),'output'))

// function classDecorator(): ClassDecorator {
//     return target => {
//       // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
//       Reflect.defineMetadata('classMetaData', 'a', target);
//     };
//   }

//   function methodDecorator(): MethodDecorator {
//     return (target, key, descriptor) => {
//       // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
//       Reflect.defineMetadata('methodMetaData', 'b', target, key);
//     };
//   }

//   @classDecorator()
//   class SomeClass {
//     @methodDecorator()
//     someMethod() {}
//   }

//   Reflect.getMetadata('classMetaData', SomeClass); // 'a'
//   Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod'); // 'b'

type Constructor<T = any> = new (...arg: any[]) => T;

const Injectable = (): ClassDecorator => target => { };

class OtherService {
    a = 1;
}

@Injectable()
class TestService {
    constructor(public readonly otherService: OtherService) { }

    testMethod() {
        console.log(this.otherService.a);
        return '来自testMethod'
    }
}

const Factory = <T>(target: Constructor<T>): T => {

    const providers = Reflect.getMetadata('design:paramtypes', target);
    const args = providers.map((provider: Constructor) => new provider());
    return new target(...args)
}


const r = Factory(TestService).testMethod();
console.log(r);
