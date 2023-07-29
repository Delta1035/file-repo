package com.wistron.avatar.lineworkcentermap.service.impl;
import com.wistron.avatar.common.entity.elasticSearch7.LineWorkCenterMapEntity;
import com.wistron.avatar.common.entity.oraclev360kpi.LineStage;
import com.wistron.avatar.common.vo.RequestInfo;
import com.wistron.avatar.common.vo.esvo.EsResultVo;
import com.wistron.avatar.lineworkcentermap.mapper.elasticsearch7.IGetEs7DataMapper;
import com.wistron.avatar.lineworkcentermap.service.IGetDateFormESService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class GetDateFormESImplService implements IGetDateFormESService {

    @Autowired
    public IGetEs7DataMapper getEs7DataMapper;
    @Autowired
    public GetDataFromOracleKpiServiceimpl getDataFromOracleKpiServiceimpl;
    @Autowired
    public InsertDataToOracleKpiServiceimpl insertDataToOracleKpiServiceimpl;
    @Override
    public void getDateFromES(RequestInfo requestInfo) {
        try{
            String log = "[1] ";
            HashMap<String,Object> map = new HashMap<>();
            map.put("plant",requestInfo.plant);
            EsResultVo<LineWorkCenterMapEntity> result =  this.getEs7DataMapper.getDataByParam("sfcs_lineworkcentermap",map);
            System.out.println(result);
            log = "[2] 获取es里面的数据";
            List<LineWorkCenterMapEntity> data = result.getDatas();
            this.getDataFromOracleKpiServiceimpl.selectAll();
            Date date = new Date();
            Long timeStemp = date.getTime();
            for(LineWorkCenterMapEntity item:data){
                LineStage lineStage = new LineStage();
                lineStage.setPLANT(item.getPlant());
                lineStage.setLINE(item.getLine());
                lineStage.setSTAGE(item.getStage());
                lineStage.setGROUPNAME(item.getGroupname());
                lineStage.setOFFSET("noOffset");
                lineStage.setOPERATIONSEQ(item.getOperationseq());
                lineStage.setPRIORITY(item.getPriority());
                lineStage.setTIMESTAMP(timeStemp.toString());
                lineStage.setUPDT(date);
                lineStage.setWORKCENTER(item.getWorkcenter());
                System.out.println(lineStage);
                this.insertDataToOracleKpiServiceimpl.insertDataToOracleKpi(lineStage);
            }
        }catch (Exception e){
            System.out.println(e);
        }

    }

}
