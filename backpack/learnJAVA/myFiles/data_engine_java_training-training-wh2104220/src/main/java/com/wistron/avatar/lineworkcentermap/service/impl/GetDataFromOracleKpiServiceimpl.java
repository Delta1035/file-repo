package com.wistron.avatar.lineworkcentermap.service.impl;

import com.wistron.avatar.common.entity.oraclev360kpi.LineStage;
import com.wistron.avatar.lineworkcentermap.mapper.oraclekpi.IInsertDataToOracleKpi;
import com.wistron.avatar.lineworkcentermap.service.IGetDataFromOracleKpiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GetDataFromOracleKpiServiceimpl implements IGetDataFromOracleKpiService {
    @Autowired
    IInsertDataToOracleKpi insertDataToOracleKpi;
    @Override
    public List<LineStage> selectAll() {
        List<LineStage> lineStages = this.insertDataToOracleKpi.selectAll();
        System.out.println(lineStages);
        return null;
    }
}
