package com.wistron.avatar.lineworkcentermap.service;

import com.wistron.avatar.common.entity.oraclev360kpi.LineStage;

import java.util.List;

public interface IGetDataFromOracleKpiService {
    public List<LineStage> selectAll();
}
