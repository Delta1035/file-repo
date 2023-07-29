package com.wistron.avatar.common.util.esutil;

import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;

public class Es7ClientFactoryUtil {

    private Es7ClientFactoryUtil() {}

    /**
     * es7读取dsl文件
     */
    public static Es7SearchAndParseResultUtil getClient(String packageUrl) throws EsExceptionUtil {

        DSLConfigurationUtil configuration;
        configuration = new DSLConfigurationUtil(packageUrl);
        return new Es7SearchAndParseResultUtil(configuration);
    }
}
