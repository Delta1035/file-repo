package com.wistron.avatar.checkdata.mapper.postgresv360;

import java.util.Date;
import java.util.HashMap;

public interface ICheckStagingDataPostgresV360Mapper {

    Date findMaxTimeDateByParam(HashMap<String,Object> hashMap);

    String findMaxTimeStringByParam(HashMap<String,Object> hashMap);

}
