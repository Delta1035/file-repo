package com.wistron.avatar;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    @SuppressWarnings("static-access")
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationContextProvider.applicationContext = applicationContext;
    }

    /**
     * Get Application Context
     */
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    /**
     * Get bean by name.
     */
    public static Object getBean(String name) {
        if(applicationContext != null)
            return applicationContext.getBean(name);
        else return null;
    }

    /**
     * Get bean by class
     */
    public static <T> T getBean(Class<T> clazz) {
        if(applicationContext != null)
            return applicationContext.getBean(clazz);
        else return null;
    }

    /**
     * Get bean by class and name.
     */
    public static <T> T getBean(String name, Class<T> clazz) {
        if(applicationContext != null)
            return getApplicationContext().getBean(name, clazz);
        return null;
    }

}