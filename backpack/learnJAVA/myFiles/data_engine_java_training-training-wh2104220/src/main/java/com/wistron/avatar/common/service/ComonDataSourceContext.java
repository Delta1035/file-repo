package com.wistron.avatar.common.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ComonDataSourceContext {
    /**
     * 装载所有的实现类至map
     */
    @Autowired
    Map<String, ICommonDataSourceService> commonDataSourceServiceMap;

    public ICommonDataSourceService getCommonDataSourceService(String dataSourceType) {
        return commonDataSourceServiceMap.get(dataSourceType);
    }
}
