package com.wistron.avatar;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    private static void setContext(ApplicationContext applicationContext) {
        ApplicationContextProvider.applicationContext = applicationContext;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        setContext(applicationContext);
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
        return getApplicationContext().getBean(name);
    }

    /**
     * Get bean by class
     */
    public static <T> T getBean(Class<T> klass) {
        return getApplicationContext().getBean(klass);
    }

    /**
     * Get bean by class and name.
     */
    public static <T> T getBean(String name, Class<T> klass) {
        return getApplicationContext().getBean(name, klass);
    }
}