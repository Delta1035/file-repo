package com.wistron.avatar.checkdata.mapper.postgresstaging;

import java.util.Date;
import java.util.HashMap;

public interface ICheckStagingDataPostgresStagingMapper {

    Date findMaxTimeDateByParam(HashMap<String,Object> hashMap);

    String findMaxTimeStringByParam(HashMap<String,Object> hashMap);}
