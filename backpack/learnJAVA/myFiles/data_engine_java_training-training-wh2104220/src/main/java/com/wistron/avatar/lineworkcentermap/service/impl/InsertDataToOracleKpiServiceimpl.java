package com.wistron.avatar.lineworkcentermap.service.impl;

import com.wistron.avatar.common.entity.oraclev360kpi.LineStage;
import com.wistron.avatar.lineworkcentermap.mapper.oraclekpi.IInsertDataToOracleKpi;
import com.wistron.avatar.lineworkcentermap.service.IInsterDataToOracleKpiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertDataToOracleKpiServiceimpl implements IInsterDataToOracleKpiService {
    @Autowired
    IInsertDataToOracleKpi insertDataToOracleKpi;
    @Override
    public void insertDataToOracleKpi(LineStage lineStage) {
        try {
            this.insertDataToOracleKpi.insertDataToOracleKpi((lineStage));
        }catch (Exception e){
            throw e;
        }
    }
}
