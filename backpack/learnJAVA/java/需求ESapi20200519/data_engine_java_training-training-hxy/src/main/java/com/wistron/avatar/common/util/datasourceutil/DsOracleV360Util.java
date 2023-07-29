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
@MapperScan(basePackages = "com.wistron.avatar.*.mapper.oraclev360", sqlSessionFactoryRef = "oracleV360SessionFactory", sqlSessionTemplateRef = "oracleV360SessionTemplate")
public class DsOracleV360Util {

    @Bean(name = "oracleV360DataSource")
    @ConfigurationProperties(prefix = "spring.datasource.oraclev360")
    public HikariDataSource oracleV360DataSource() {
        return new HikariDataSource();
    }

    @Bean(name = "oracleV360SessionFactory")
    public SqlSessionFactory oracleV360SessionFactory(@Qualifier("oracleV360DataSource") DataSource dataSource)
            throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactoryBean = new MybatisSqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        // 打印sql语句
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setMapUnderscoreToCamelCase(false);
        configuration.setCacheEnabled(false);
        // 配置打印sql语句
        configuration.setLogImpl(StdOutImpl.class);
        sqlSessionFactoryBean.setConfiguration(configuration);

        // 读取配置
        VFS.addImplClass(SpringBootVFS.class);
        sqlSessionFactoryBean.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath*:**/mapper/oraclev360/xml/*Mapper.xml"));
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "oracleV360TransactionManager")
    public DataSourceTransactionManager oracleV360TransactionManager(@Qualifier("oracleV360DataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "oracleV360SessionTemplate")
    public SqlSessionTemplate oracleV360SessionTemplate(@Qualifier("oracleV360SessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
