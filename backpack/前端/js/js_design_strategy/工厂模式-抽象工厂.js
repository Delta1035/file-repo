class AbstractMobilePhoneFactory {
    createOS(){
        throw new Error('抽象工厂方法,不允许调用,请重写')
    }

    createHardWare(){
        throw new Error('抽象工厂方法,不允许调用,请重写')
    }
}
// new AbstractMobilePhoneFactory().createHardWare(); // 报错