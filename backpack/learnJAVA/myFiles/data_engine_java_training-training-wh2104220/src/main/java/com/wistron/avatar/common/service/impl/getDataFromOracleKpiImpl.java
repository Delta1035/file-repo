package com.wistron.avatar.common.service.impl;

import com.wistron.avatar.common.service.ICommonDataSourceService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
//oraclekpi
@Service()
public class getDataFromOracleKpiImpl implements ICommonDataSourceService {
    @Override
    public Date findMaxTimeDateByParam(HashMap<String, Object> hashMap) {
        return null;
    }

    @Override
    public String findMaxTimeStringByParam(HashMap<String, Object> hashMap) {
        return null;
    }
}
