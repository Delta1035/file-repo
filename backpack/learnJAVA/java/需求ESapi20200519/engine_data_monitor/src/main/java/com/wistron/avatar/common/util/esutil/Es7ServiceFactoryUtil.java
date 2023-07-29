package com.wistron.avatar.common.util.esutil;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.cglib.proxy.InvocationHandler;
import org.springframework.cglib.proxy.Proxy;


public class Es7ServiceFactoryUtil<T> implements FactoryBean<T> {

    private Class<T> interfaceType;

    public Es7ServiceFactoryUtil(Class<T> interfaceType) {
        this.interfaceType = interfaceType;
    }

    /**
     * es7 指定代理
     * @return
     */
    @Override
    public T getObject() {
        InvocationHandler handler = new Es7ServiceProxyUtil(interfaceType);
        return (T) Proxy.newProxyInstance(interfaceType.getClassLoader(),
                new Class[]{interfaceType}, handler);
    }

    @Override
    public Class<T> getObjectType() {
        return interfaceType;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
