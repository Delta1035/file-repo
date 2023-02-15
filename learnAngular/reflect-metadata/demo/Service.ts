import containerInstance from "./container";

// 使用id初始化
export function Service(idOrSingleton: string): Function;
// 单例初始化
export function Service(singleton: boolean): Function;
// 使用id并当做单例
export function Service(
  idOrSingleton?: string | boolean,
  singleton?: boolean
): any {
  return function (target: ObjectConstructor) {
    let _id;
    let _singleton;
    let _singleInstance;
    if (typeof idOrSingleton === "boolean") {
      // 说明是单例
      _singleton = true;
      _id = Symbol(target.name); // 拿到构造函数的名字作为id标识
    } else {
      // 如果不是单例， 那么传入的就是一个id， 判断id是否存在
      // 存在就直接拿出来， 不存在就创建一个新的实例 存到容器里面
      if (idOrSingleton && containerInstance.has(idOrSingleton)) {
        // 此时idOrSingleton是id, 判断id是否存在
        throw new Error(
          `Service: this id (${idOrSingleton}) has been registered`
        );
      } else {
        _id = idOrSingleton || target.name;

        _singleInstance = new target() || target;
        Reflect.defineMetadata('custom:id',_id,target)
        // 将id和构造函数实例注册到容器
        containerInstance.set(_id, _singleInstance);
      }
    }
  };
}
