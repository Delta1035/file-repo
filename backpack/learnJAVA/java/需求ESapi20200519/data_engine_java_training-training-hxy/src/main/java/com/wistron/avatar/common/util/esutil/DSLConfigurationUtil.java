package com.wistron.avatar.common.util.esutil;

import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.session.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;

@Component
public class DSLConfigurationUtil extends Configuration {

    @Autowired
    public DSLConfigurationUtil() {
        super();
    }

    /**
     * 读取dsl.xml
     */
    public DSLConfigurationUtil(String url) throws EsExceptionUtil {
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resource;

        try {
            resource = resolver.getResources(url);

            for (Resource rs : resource) {
                XMLMapperBuilder mapperParser = new XMLMapperBuilder(rs.getInputStream(), this,
                        Arrays.toString(resource), this.getSqlFragments());
                mapperParser.parse();
            }
        } catch (IOException e) {
            throw new EsExceptionUtil("获取dsl.xml失败");
        }
    }
}
