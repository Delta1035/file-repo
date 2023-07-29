package com.wistron.avatar.sfclinestage.mapper.elasticsearch7;


import com.wistron.avatar.common.entity.elasticsearch7.SfcsLineWorkCenterMapEntity;
import com.wistron.avatar.common.vo.esvo.EsResultVo;

import java.util.HashMap;

public interface ISfcsLineWorkCenterMapMapper {

    EsResultVo<SfcsLineWorkCenterMapEntity> getSfcLineStageByParam(String index, HashMap<String, Object> hashMap);

}
