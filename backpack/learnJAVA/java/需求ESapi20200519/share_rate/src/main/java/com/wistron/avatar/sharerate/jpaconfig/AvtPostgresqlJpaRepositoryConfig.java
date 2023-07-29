package com.wistron.avatar.sharerate.jpaconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "entityManagerFactoryPostgresql", transactionManagerRef = "transactionManagerPostgresql", basePackages = {
        "com.wistron.avatar.sharerate.jpaaccess.postgresql.repository" })
public class AvtPostgresqlJpaRepositoryConfig {

    @Autowired
    private JpaProperties jpaProperties;

    @Autowired
    private HibernateProperties hibernateProperties;

    @Autowired
    @Qualifier("postgresqlDataSource")
    private DataSource postgresqlDataSource;

    @Primary
    @Bean(name = "entityManagerPostgresql")
    public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
        EntityManagerFactory entityManagerFactory = entityManagerFactoryPostgresql(builder).getObject();

        if (entityManagerFactory != null) {
            return entityManagerFactory.createEntityManager();
        } else {
            return null;
        }
    }

    @Value("${spring.jpa.postgresql-database-platform}")
    private String postgresqlDatabasePlatform;

    @Primary
    @Bean(name = "entityManagerFactoryPostgresql")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryPostgresql(EntityManagerFactoryBuilder builder) {

        Map<String, Object> properties = hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(),
                new HibernateSettings());
        LocalContainerEntityManagerFactoryBean factory = builder.dataSource(postgresqlDataSource).properties(properties)
                .packages("com.wistron.avatar.sharerate.jpaaccess.postgresql.entity").persistenceUnit(
                        "postgresqlPersistenceUnit")
                .build();
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabasePlatform(this.postgresqlDatabasePlatform);
        vendorAdapter.setShowSql(jpaProperties.isShowSql());
        vendorAdapter.setDatabase(jpaProperties.getDatabase());
        vendorAdapter.setGenerateDdl(jpaProperties.isGenerateDdl());
        factory.setJpaVendorAdapter(vendorAdapter);
        return factory;
    }

    @Primary
    @Bean(name = "transactionManagerPostgresql")
    public PlatformTransactionManager transactionManagerPostgresql(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(entityManagerFactoryPostgresql(builder).getObject());
    }
}

