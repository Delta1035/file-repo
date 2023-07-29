package com.wistron.avatar.checkdata.mapper.elasticsearch7;


import com.wistron.avatar.common.entity.elasticsearch7.CommonEntity;
import com.wistron.avatar.common.vo.esvo.EsResultVo;

import java.util.HashMap;

public interface ICheckEs7DataMapper {

    EsResultVo<CommonEntity> findMaxTimeByParam(String index, HashMap<String, Object> hashMap);

}
