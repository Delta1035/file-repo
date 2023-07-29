package com.wistron.avatar.common.util.esutil;

import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.ClassUtils;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Set;

/**
* 将指定packages的bean注入到容器中
*/

@Component
public class EsServiceBeanDefinitionRegistryUtil implements BeanDefinitionRegistryPostProcessor, ResourceLoaderAware, ApplicationContextAware, InitializingBean {
    private static final String DEFAULT_RESOURCE_PATTERN = "**/*.class";
    private ApplicationContext applicationContext;
    private MetadataReaderFactory metadataReaderFactory;
    private ResourcePatternResolver resourcePatternResolver;

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        System.out.println("BeanDefinitionRegistry in BeanDefinitionRegistryPostProcessor....");
        Set<Class<?>> klassSetEs7;

        try {
            klassSetEs7 = scannerPackages("com.wistron.avatar.*.mapper.elasticsearch7");
        }catch (EsExceptionUtil | IOException e){
            throw new ExceptionInInitializerError(e);
        }

        klassSetEs7.stream().filter(Class::isInterface).forEach(x -> registerBeanEs7(registry, x));
    }

    private void registerBeanEs7(BeanDefinitionRegistry registry, Class klass) {

        BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition(klass);
        GenericBeanDefinition definition = (GenericBeanDefinition) builder.getRawBeanDefinition();

        //在这里，我们可以给该对象的属性注入对应的实例。
        // 注意，如果采用definition.getPropertyValues()方式的话，
        // 类似definition.getPropertyValues().add("interfaceType", beanClazz);
        // 则要求在FactoryBean（本应用中即ServiceFactory）提供setter方法，否则会注入失败
        // 如果采用definition.getConstructorArgumentValues()，
        // 则FactoryBean中需要提供包含该属性的构造方法，否则会注入失败
        definition.getConstructorArgumentValues().addGenericArgumentValue(klass);

        //注意，这里的BeanClass是生成Bean实例的工厂，不是Bean本身。
        // FactoryBean是一种特殊的Bean，其返回的对象不是指定类的一个实例，
        // 其返回的是该工厂Bean的getObject方法所返回的对象。
        definition.setBeanClass(Es7ServiceFactoryUtil.class);
        //这里采用的是byType方式注入，类似的还有byName等
        definition.setAutowireMode(GenericBeanDefinition.AUTOWIRE_BY_TYPE);
        registry.registerBeanDefinition(klass.getSimpleName(), definition);
    }


    /**
     * 获取指定路径及子路径下的所有类
     */
    private Set<Class<?>> scannerPackages(String basePackage) throws EsExceptionUtil, IOException {
        Set<Class<?>> set = new LinkedHashSet<>();
        String basePackageName = ClassUtils.convertClassNameToResourcePath(applicationContext.getEnvironment().resolveRequiredPlaceholders(basePackage));

        String packageSearchPath = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX +
                basePackageName + '/' + DEFAULT_RESOURCE_PATTERN;
        Resource[] resources = this.resourcePatternResolver.getResources(packageSearchPath);

        for (Resource resource : resources) {
            if (resource.isReadable()) {
                MetadataReader metadataReader = this.metadataReaderFactory.getMetadataReader(resource);
                String className = metadataReader.getClassMetadata().getClassName();
                Class<?> klass;

                try {
                    klass = Class.forName(className);
                    set.add(klass);
                } catch (ClassNotFoundException e) {
                    throw new EsExceptionUtil("es dsl文件装载失败");
                }
            }
        }

        return set;
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        System.out.println( "postProcessBeanFactory in postProcessBeanFactory....");
    }

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        System.out.println("resourceLoader in ResourceLoaderAware....");
        this.resourcePatternResolver = ResourcePatternUtils.getResourcePatternResolver(resourceLoader);
        this.metadataReaderFactory = new CachingMetadataReaderFactory(resourceLoader);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("applicationContext in ApplicationContextAware....");
        this.applicationContext = applicationContext;
    }

    @Override
    public void afterPropertiesSet() {
        System.out.println("afterPropertiesSet in InitializingBean");
    }
}
