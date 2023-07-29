package com.wistron.avatar.checkdata.mapper.postgresengine;

import com.wistron.avatar.common.entity.postgresengine.CommonDataMonitorSettingEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface ICheckStagingDataPostgresEngineMapper {

    List<CommonDataMonitorSettingEntity> getCommonDataMonitorSettingEntityListByExecutionGroup(String executionGroup);

    Date findMaxTimeDateByParam(HashMap<String,Object> hashMap);

    String findMaxTimeStringByParam(HashMap<String,Object> hashMap);


}
