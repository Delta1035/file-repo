package com.wistron.avatar.checkdata.mapper.oraclekpi;

import java.util.Date;
import java.util.HashMap;

public interface ICheckStagingDataOracleKpiMapper {

    Date findMaxTimeDateByParam(HashMap<String,Object> hashMap);

    String findMaxTimeStringByParam(HashMap<String,Object> hashMap);
}
