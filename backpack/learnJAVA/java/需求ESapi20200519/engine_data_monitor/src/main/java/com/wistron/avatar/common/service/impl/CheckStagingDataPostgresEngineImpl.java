package com.wistron.avatar.common.service.impl;

import com.wistron.avatar.checkdata.mapper.postgresengine.ICheckStagingDataPostgresEngineMapper;
import com.wistron.avatar.common.service.ICommonDataSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;


@Service("postgresengine")
public class CheckStagingDataPostgresEngineImpl implements ICommonDataSourceService {

    @Autowired
    private ICheckStagingDataPostgresEngineMapper checkStageDataPostgresEngineMapper;

    @Override
    public Date findMaxTimeDateByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresEngineMapper.findMaxTimeDateByParam(hashMap);
    }

    @Override
    public String findMaxTimeStringByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresEngineMapper.findMaxTimeStringByParam(hashMap);
    }
}
