package com.wistron.avatar.effective.service;

import com.wistron.avatar.effective.service.oracle.impl.OracleEffectiveServiceImpl;
import com.wistron.avatar.effective.service.postgre.impl.PostgrePostgreEffectiveServiceImpl;
import com.wistron.avatar.effective.service.postgre.impl.PostgreUpdateLogServiceImpl;
import com.wistron.avatar.common.entity.oracle.OracleEffective;
import com.wistron.avatar.common.entity.postgre.AtBaModifyLog;
import com.wistron.avatar.common.vo.ApiResponseVo;
import com.wistron.avatar.common.vo.GenAtBaMoLineEffectiveRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class GenAtBaMoLineEffectiveService {
    @Autowired
    PostgrePostgreEffectiveServiceImpl postgrePostgreEffectiveServiceImpl;
    @Autowired
    OracleEffectiveServiceImpl oracleEffectiveServiceImpl;
    @Autowired
    PostgreUpdateLogServiceImpl postgreUpdateLogServiceImpl;
    public ApiResponseVo<String> genAtBaMoLineEffective(GenAtBaMoLineEffectiveRequest request){
        System.out.println(request);
    List<String> plantList = request.requestInfo.plant;
    Integer plantListSize = plantList.size();
    List<OracleEffective> oracleEffective;
    List<String> plantNames = this.oracleEffectiveServiceImpl.selectAllPlantName();

    //1. 空厂区 代表不过滤
    if(plantListSize == 0){
        oracleEffective = this.oracleEffectiveServiceImpl.getAll();
    }else{
        oracleEffective = this.oracleEffectiveServiceImpl.selectByPlants(plantList);
    }
    System.out.println(oracleEffective);
    //2. 将搜到的数据插入postgre
    for(OracleEffective effective:oracleEffective){
        Map effectiveMap = new HashMap<>();
        effectiveMap.put("plant",effective.getPlant());
        effectiveMap.put("process",effective.getProcess());
        effectiveMap.put("line",effective.getLine());
        effectiveMap.put("crby",effective.getCrby());
        effectiveMap.put("crdate",effective.getCrdate());
        effectiveMap.put("updby",effective.getUpdby());
        effectiveMap.put("upddate",effective.getUpddate());
        effectiveMap.put("lineTop",effective.getLineTop());
        effectiveMap.put("lineBtm",effective.getLineBtm());
        effectiveMap.put("lineChange",effective.getLineChange());
        this.postgrePostgreEffectiveServiceImpl.insertOneEffective(effectiveMap);
    }
    AtBaModifyLog logInfo = new AtBaModifyLog();
    Date date = new Date();
    var sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    System.out.println(sdf.format(date));
    logInfo.setModifyTime(date);
    logInfo.setTableName("AT_BA_MO_LINEEFFECTIVE");
    logInfo.setModifyUserCode(request.requestInfo.owner);
    //3. 更新或者插入编辑记录
    this.postgreUpdateLogServiceImpl.updateTableModifiedInfo(logInfo);
    //4. 删除旧数据
    this.oracleEffectiveServiceImpl.deleteByPlants(plantList);
    return new ApiResponseVo("0000000","api return ok",request.requestInfo);
    }
}
