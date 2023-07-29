package com.wistron.avatar.sfclinestage.service;

import com.wistron.avatar.common.entity.elasticsearch7.SfcsLineWorkCenterMapEntity;
import com.wistron.avatar.common.entity.oraclekpi.SfcLineStageTempHxyEntity;
import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import com.wistron.avatar.common.vo.GenSfcLineStageParamVo;
import com.wistron.avatar.common.vo.esvo.EsResultVo;
import com.wistron.avatar.sfclinestage.mapper.elasticsearch7.ISfcsLineWorkCenterMapMapper;
import com.wistron.avatar.sfclinestage.mapper.oraclekpi.ISfcLineStageTempHxyMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Validated
@Slf4j
public class SfcLineStageService {

    @Autowired
    ISfcsLineWorkCenterMapMapper sfcsLineWorkCenterMapMapper;

    @Autowired
    ISfcLineStageTempHxyMapper sfcLineStageTempHxyMapper;

    public void genSfcLineStage(GenSfcLineStageParamVo genSfcLineStageParamVo) throws Exception {
        String step = "[1].根据入参,执行es查询逻辑";
        try {
            HashMap<String,Object> hashMap = new HashMap<>();
            hashMap.put("plant", genSfcLineStageParamVo.getPlant());
            EsResultVo<SfcsLineWorkCenterMapEntity> esResultVo = sfcsLineWorkCenterMapMapper.getSfcLineStageByParam("sfcs_lineworkcentermap", hashMap);
            List<SfcsLineWorkCenterMapEntity> list = esResultVo.getDatas();
            System.out.println(Arrays.toString(list.toArray()));
            step = "[2].根据es列表,循环插入oracle";
            Timestamp ts = new Timestamp(new Date().getTime());
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
            list.forEach(ele -> {
                SfcLineStageTempHxyEntity eleOfHxy = new SfcLineStageTempHxyEntity();
                eleOfHxy.setTimestamp(df.format(ts));
                eleOfHxy.setPlant(ele.getPlant());
                eleOfHxy.setGroupName(ele.getGroupname());
                eleOfHxy.setLine(ele.getLine());
                eleOfHxy.setWorkCenter(ele.getWorkcenter());
                eleOfHxy.setOperationSeq(ele.getOperationseq());
                eleOfHxy.setStage(ele.getStage());
                eleOfHxy.setPriority(ele.getPriority());
                eleOfHxy.setUpdateTime(ts);
                eleOfHxy.setOffset("noOFFSET");
                sfcLineStageTempHxyMapper.insert(eleOfHxy);
            });
        } catch (Exception ex) {
            log.error(ex.getMessage());
            throw new Exception(step);
        }
    }
}