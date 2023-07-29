package com.wistron.avatar.lineworkcentermap.mapper.elasticsearch7;

import com.wistron.avatar.common.entity.elasticSearch7.LineWorkCenterMapEntity;
import com.wistron.avatar.common.vo.esvo.EsResultVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface IGetEs7DataMapper {
    EsResultVo<LineWorkCenterMapEntity> getDataByParam(String index, HashMap<String,Object> hashMap);
}
