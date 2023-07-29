package com.wistron.avatar.common.service;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service
public interface ICommonDataSourceService {
    /**
     * 获取最近时间的date类型函数
     * @param hashMap
     * @return
     */
    Date findMaxTimeDateByParam(HashMap<String,Object> hashMap);

    /**
     * 获取最近时间的string类型函数
     * @param hashMap
     * @return
     */
    String findMaxTimeStringByParam(HashMap<String,Object> hashMap);
}
