package com.wistron.avatar.common.service.impl;

import com.wistron.avatar.checkdata.mapper.postgresv360.ICheckStagingDataPostgresV360Mapper;
import com.wistron.avatar.common.service.ICommonDataSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service("postgresv360")
public class CheckStagingDataPostgresV360Impl implements ICommonDataSourceService {

    @Autowired
    private ICheckStagingDataPostgresV360Mapper checkStageDataPostgresV360Mapper;

    @Override
    public Date findMaxTimeDateByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresV360Mapper.findMaxTimeDateByParam(hashMap);
    }

    @Override
    public String findMaxTimeStringByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresV360Mapper.findMaxTimeStringByParam(hashMap);
    }
}
