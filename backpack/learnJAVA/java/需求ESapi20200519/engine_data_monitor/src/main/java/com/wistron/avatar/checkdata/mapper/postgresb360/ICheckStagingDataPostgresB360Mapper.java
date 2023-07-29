package com.wistron.avatar.checkdata.mapper.postgresb360;

import java.util.Date;
import java.util.HashMap;

public interface ICheckStagingDataPostgresB360Mapper {

    Date findMaxTimeDateByParam(HashMap<String,Object> hashMap);

    String findMaxTimeStringByParam(HashMap<String,Object> hashMap);
}
