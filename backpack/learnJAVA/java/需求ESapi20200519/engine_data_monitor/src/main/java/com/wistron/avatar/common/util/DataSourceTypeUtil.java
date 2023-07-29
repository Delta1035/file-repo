package com.wistron.avatar.common.util;

public enum DataSourceTypeUtil {

    PG("postgres"), ES7("elasticsearch7");

    private String dataSourceType;

    DataSourceTypeUtil(String dataSourceType) {
        this.dataSourceType = dataSourceType;
    }

    public String getVale(){
        return dataSourceType;
    }

}
