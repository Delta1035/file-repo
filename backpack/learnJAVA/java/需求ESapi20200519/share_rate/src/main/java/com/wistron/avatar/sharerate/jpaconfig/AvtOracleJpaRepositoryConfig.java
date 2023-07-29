package com.wistron.avatar.sharerate.jpaconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "entityManagerFactoryOracle", transactionManagerRef = "transactionManagerOracle", basePackages = {
        "com.wistron.avatar.sharerate.jpaaccess.oracle.repository" }) // The base package of repository
public class AvtOracleJpaRepositoryConfig {

    @Autowired
    private JpaProperties jpaProperties;

    @Autowired
    private HibernateProperties hibernateProperties;

    @Autowired
    @Qualifier("oracleDataSource")
    private DataSource oracleDataSource;

    @Bean(name = "entityManagerOracle")
    public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
        EntityManagerFactory entityManagerFactory = entityManagerFactoryOracle(builder).getObject();

        if (entityManagerFactory != null) {
            return entityManagerFactory.createEntityManager();
        } else {
            return null;
        }
    }

    @Bean(name = "entityManagerFactoryOracle")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryOracle(EntityManagerFactoryBuilder builder) {

        Map<String, Object> properties = hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(),
                new HibernateSettings());

        return builder.dataSource(oracleDataSource).properties(properties)
                .packages("com.wistron.avatar.sharerate.jpaaccess.oracle.entity") // The packages of entity
                .persistenceUnit("oraclePersistenceUnit").build();
    }

    @Bean(name = "transactionManagerOracle")
    public PlatformTransactionManager transactionManagerOracle(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(entityManagerFactoryOracle(builder).getObject());
    }

}

