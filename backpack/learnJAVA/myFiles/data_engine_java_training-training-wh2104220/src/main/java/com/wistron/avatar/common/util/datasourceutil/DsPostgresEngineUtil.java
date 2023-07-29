package com.wistron.avatar.common.util.datasourceutil;

import com.baomidou.mybatisplus.autoconfigure.SpringBootVFS;
import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.io.VFS;
import org.apache.ibatis.logging.stdout.StdOutImpl;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
@MapperScan(basePackages = "com.wistron.avatar.*.mapper.postgresengine", sqlSessionFactoryRef = "postgresEngineSessionFactory", sqlSessionTemplateRef = "postgresEngineSessionTemplate")
public class DsPostgresEngineUtil {

    @Bean(name = "postgresEngineDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.postgresengine")
    public HikariDataSource postgresEngineDataSource() {
        return new HikariDataSource();
    }

    @Bean(name = "postgresEngineSessionFactory")
    public SqlSessionFactory postgresEngineSessionFactory(@Qualifier("postgresEngineDataSource") DataSource dataSource)
            throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactoryBean = new MybatisSqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        // 打印sql语句
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setMapUnderscoreToCamelCase(true);
        configuration.setCacheEnabled(false);
        // 配置打印sql语句
        configuration.setLogImpl(StdOutImpl.class);
        sqlSessionFactoryBean.setConfiguration(configuration);

        // 读取xml配置
        VFS.addImplClass(SpringBootVFS.class);
        sqlSessionFactoryBean.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath*:**/mapper/postgresengine/xml/*Mapper.xml"));
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "postgresEngineTransactionManager")
    public DataSourceTransactionManager postgresEngineTransactionManager(@Qualifier("postgresEngineDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "postgresEngineSessionTemplate")
    public SqlSessionTemplate postgresEngineSessionTemplate(@Qualifier("postgresEngineSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
