package com.wistron.avatar.common.service.impl;

import com.wistron.avatar.checkdata.mapper.postgresstaging.ICheckStagingDataPostgresStagingMapper;
import com.wistron.avatar.common.service.ICommonDataSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;


@Service("postgresstaging")
public class CheckStagingDataPostgresStagingImpl implements ICommonDataSourceService {

    @Autowired
    private ICheckStagingDataPostgresStagingMapper checkStageDataPostgresStagingMapper;

    @Override
    public Date findMaxTimeDateByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresStagingMapper.findMaxTimeDateByParam(hashMap);
    }

    @Override
    public String findMaxTimeStringByParam(HashMap<String,Object> hashMap) {
        return checkStageDataPostgresStagingMapper.findMaxTimeStringByParam(hashMap);
    }
}
