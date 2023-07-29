package com.wistron.avatar.common.service.impl;

import com.wistron.avatar.checkdata.mapper.postgresb360.ICheckStagingDataPostgresB360Mapper;
import com.wistron.avatar.common.service.ICommonDataSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service("postgresb360")
public class CheckStagingDataPostgresB360Impl implements ICommonDataSourceService {

    @Autowired
    private ICheckStagingDataPostgresB360Mapper checkStageDataPostgresB360Mapper;

    @Override
    public Date findMaxTimeDateByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresB360Mapper.findMaxTimeDateByParam(hashMap);
    }

    @Override
    public String findMaxTimeStringByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresB360Mapper.findMaxTimeStringByParam(hashMap);
    }
}
