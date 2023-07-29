package com.wistron.avatar.common.service.impl;

import com.wistron.avatar.checkdata.mapper.oraclekpi.ICheckStagingDataOracleKpiMapper;
import com.wistron.avatar.common.service.ICommonDataSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service("oraclekpi")
public class CheckStagingDataOracleKpiImpl implements ICommonDataSourceService {

    @Autowired
    private ICheckStagingDataOracleKpiMapper checkStageDataOracleKpiMapper;

    @Override
    public Date findMaxTimeDateByParam(HashMap<String,Object> hashMap) {
        return checkStageDataOracleKpiMapper.findMaxTimeDateByParam(hashMap);
    }

    @Override
    public String findMaxTimeStringByParam(HashMap<String,Object> hashMap) {
        return checkStageDataOracleKpiMapper.findMaxTimeStringByParam(hashMap);
    }
}
