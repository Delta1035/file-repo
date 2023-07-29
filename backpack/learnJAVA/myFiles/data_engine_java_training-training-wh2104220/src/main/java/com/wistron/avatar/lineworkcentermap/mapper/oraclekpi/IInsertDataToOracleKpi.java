package com.wistron.avatar.lineworkcentermap.mapper.oraclekpi;


import com.wistron.avatar.common.entity.oraclev360kpi.LineStage;

import java.util.List;

public interface IInsertDataToOracleKpi {
    void insertDataToOracleKpi(LineStage lineStage);
    List<LineStage> selectAll();
}
