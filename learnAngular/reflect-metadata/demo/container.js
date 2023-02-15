export class Container {
    constructor() {
        this.bindMap = new Map();
    }
    // 注册实例
    bind(identifier, klass, constructorArgs) {
        this.bindMap.set(identifier, {
            klass, constructorArgs
        });
    }
    get(identifier) {
        const target = this.bindMap.get(identifier);
        const { klass, constructorArgs } = target;
        const instance = Reflect.construct(klass, constructorArgs);
        return instance;
    }
}
