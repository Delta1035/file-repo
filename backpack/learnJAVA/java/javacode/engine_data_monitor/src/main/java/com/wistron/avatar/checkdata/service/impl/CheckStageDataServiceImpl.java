package com.wistron.avatar.checkdata.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wistron.avatar.checkdata.mapper.elasticsearch7.ICheckEs7DataMapper;
import com.wistron.avatar.checkdata.mapper.postgresengine.ICheckStagingDataPostgresEngineMapper;
import com.wistron.avatar.checkdata.service.ICheckDataService;
import com.wistron.avatar.common.entity.elasticsearch7.CommonEntity;
import com.wistron.avatar.common.entity.postgresengine.CommonDataMonitorSettingEntity;
import com.wistron.avatar.common.service.ComonDataSourceContext;
import com.wistron.avatar.common.service.ICommonDataSourceService;
import com.wistron.avatar.common.util.ConstUtil;
import com.wistron.avatar.common.util.DataSourceTypeUtil;
import com.wistron.avatar.common.util.exceptionutil.BaseExceptionUtil;
import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import com.wistron.avatar.common.util.exceptionutil.ReturnCodeUtil;
import com.wistron.avatar.common.util.mailserviceutil.SpringMailUtil;
import com.wistron.avatar.common.vo.StageInputParamVo;
import com.wistron.avatar.common.vo.esvo.EsResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CheckStageDataServiceImpl implements ICheckDataService {

    @Autowired
    SpringTemplateEngine springTemplateEngine;

    @Autowired
    private
    ICheckStagingDataPostgresEngineMapper checkStageDataPostgresEngineMapper;

    @Autowired
    private ComonDataSourceContext comonDataSourceContext;

    @Autowired
    private ICheckEs7DataMapper iCheckEs7DataMapper;

    @Autowired
    private SpringMailUtil springMailUtil;

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public void checkData(StageInputParamVo stageInputParamVo) {
        String step = "[1].根据executionGroup获取执行列表";

        try {
            String executionGroup = stageInputParamVo.getExecutionGroup();
            List<CommonDataMonitorSettingEntity> commonDataMonitorSettingEntitieList
                    = checkStageDataPostgresEngineMapper.getCommonDataMonitorSettingEntityListByExecutionGroup(executionGroup);

            if (commonDataMonitorSettingEntitieList.isEmpty()){
                throw new BaseExceptionUtil(ReturnCodeUtil.FAIL.getCode(), step);
            }
            step = "[2].根据列表进行分别检查";
            for (CommonDataMonitorSettingEntity commonDataMonitorSettingEntity : commonDataMonitorSettingEntitieList) {
                if (commonDataMonitorSettingEntity.getCheckingDataSource().equals(DataSourceTypeUtil.ES7.getVale())){
                    this.doEs7CheckFunction(commonDataMonitorSettingEntity);
                } else {
                    this.doStagingCheckFunction(commonDataMonitorSettingEntity);
                }
            }
        }catch (EsExceptionUtil | BaseExceptionUtil totalExceptionUtil){
            throw totalExceptionUtil;
        } catch (Exception e){
            throw new BaseExceptionUtil(ReturnCodeUtil.FAIL.getCode(),step);
        }
    }

    private void doStagingCheckFunction(CommonDataMonitorSettingEntity commonDataMonitorSettingEntity){
        String step = "[2.2].拼装查询条件";

        try {
            long currentTime = (new Date().getTime() / 1000);
            Date timeStamp;
            long toleranceTimeSec = Integer.parseInt(commonDataMonitorSettingEntity.getToleranceTimeSec());
            String time;
            HashMap<String, Object> map = new HashMap<>();

            map.put("tableName", commonDataMonitorSettingEntity.getCheckingTable());
            map.put("timeType", commonDataMonitorSettingEntity.getCheckingProcessedTime());

            String jsonString = commonDataMonitorSettingEntity.getCheckingDimension();
            Map<String, String> checkingDimensionMap = this.parseJson(jsonString);

            map.put("sqlWhere", checkingDimensionMap);

            boolean timeType = commonDataMonitorSettingEntity.getCheckingProcessedTimeFormat().equals(ConstUtil.TIME_STAMP);
            step = "[2.3].根据时间字段的数据类型获取最近更新时间";
            if (Boolean.TRUE.equals(timeType)) {
                ICommonDataSourceService commonDataSourceService = comonDataSourceContext.getCommonDataSourceService(commonDataMonitorSettingEntity.getCheckingDataSource());
                timeStamp = commonDataSourceService.findMaxTimeDateByParam(map);
            } else {
                ICommonDataSourceService commonDataSourceService = comonDataSourceContext.getCommonDataSourceService(commonDataMonitorSettingEntity.getCheckingDataSource());
                time = commonDataSourceService.findMaxTimeStringByParam(map);
                timeStamp = this.dateFormat(time,commonDataMonitorSettingEntity.getCheckingProcessedTimeFormat());
            }
            step = "[2.4].比较时间差，超出允许范围进行邮件提醒";
            if (timeStamp == null || (currentTime - (timeStamp.getTime() / 1000)) > toleranceTimeSec) {
                String[] mailTo = commonDataMonitorSettingEntity.getMailTo().split(",");
                this.sendMail(mailTo, commonDataMonitorSettingEntity.getCheckingTable(), checkingDimensionMap, timeStamp, DataSourceTypeUtil.PG, commonDataMonitorSettingEntity.getMailTemplate());
            }
        } catch (EsExceptionUtil ex) {
            throw new EsExceptionUtil(step);
        } catch (Exception ex) {
            throw new BaseExceptionUtil(ReturnCodeUtil.FAIL.getCode(), step);
        }
    }

    public void doEs7CheckFunction(CommonDataMonitorSettingEntity commonDataMonitorSettingEntity){
        String step = "[1].根据入参,传入Sql执行查询";

        try {
            String index = commonDataMonitorSettingEntity.getCheckingTable();
            HashMap<String,Object> map = new HashMap<>();
            String jsonString = commonDataMonitorSettingEntity.getCheckingDimension();
            Map<String,String> checkingDimensionMap = this.parseJson(jsonString);

            map.put("sqlWhere",checkingDimensionMap);
            map.put("checking_process_time", commonDataMonitorSettingEntity.getCheckingProcessedTime());

            EsResultVo<CommonEntity> commonEntityEsResultVo = iCheckEs7DataMapper.findMaxTimeByParam(index,map);
            step = "[2].根据查询结果，获得排序的maxTime";
            String sort = commonEntityEsResultVo.getSort().get(0).toString();
            Date sortDate = this.dateFormat(sort,commonDataMonitorSettingEntity.getCheckingProcessedTimeFormat());
            long timeStampTime = (sortDate.getTime() / 1000);
            long currentTime = (new Date().getTime() / 1000);
            long toleranceTime = Integer.parseInt(commonDataMonitorSettingEntity.getToleranceTimeSec());
            String[] mailTo = commonDataMonitorSettingEntity.getMailTo().split(",");
            step = "[3].计算差异值，超出允许时间发送警告邮件";
            if ((currentTime - timeStampTime) > toleranceTime) {
                this.sendMail(mailTo,index,checkingDimensionMap, sortDate, DataSourceTypeUtil.ES7, commonDataMonitorSettingEntity.getMailTemplate());
            }
        } catch (EsExceptionUtil ex) {
            throw new EsExceptionUtil(step);
        } catch (Exception ex) {
            throw new BaseExceptionUtil(ReturnCodeUtil.FAIL.getCode(), step);
        }
    }

    private HashMap<String,String> parseJson(String jsonString){
        HashMap<String,String> map = new HashMap<>();
        JSONObject jsonObject = JSON.parseObject(jsonString);

        for (Map.Entry<String, Object> entry : jsonObject.entrySet()) {
            map.put(entry.getKey(), entry.getValue().toString());
        }

        return map;
    }

    public void sendMail(String[] mailTo, String index, Map<String,String> checkingDimensionMap, Date timeStamp, DataSourceTypeUtil dataSourceType,String mailTemplate) throws BaseExceptionUtil {
        String step = "";
        try {

            step = "[1].根据传入值格式化邮件配置参数";
            long date = System.currentTimeMillis();
            String[] cc = new String[0];
            String title = dataSourceType + " Data Missing Alert - " + index + " - " + dateFormat.format(date);
            step = "[2].根据传入值格式化邮件正文动态参数";
            HashMap<String,Object> map = new HashMap<>();
            map.put("index", index);
            map.put("server",dataSourceType);
            map.put("dimensionValue", checkingDimensionMap);
            if (timeStamp ==null){
                map.put("maxDateTime","0000-00-00 00:00:00");
            }else {
                map.put("maxDateTime", dateFormat.format(timeStamp));
            }

            step = "[3].根据正文参数替换正文变量";
            Context context = new Context();
            context.setVariables(map);
            String content = springTemplateEngine.process(mailTemplate, context);

            step = "[4].发送邮件";
            springMailUtil.sendMIME(mailTo, cc, title, content);
        }catch (Exception e){
            throw new BaseExceptionUtil(ReturnCodeUtil.FAIL.getCode(),step);
        }
    }

    public Date dateFormat(String sort , String format){
        String[] dateFormat = {"yyyy-MM-dd HH:mm:ss",
                "yyyy-MM-dd'T'HH:mm:ss.SSS Z",
                "yyyyMMddHHmmssSSS",
                "yyyy-MM-dd'T'HH:mm:ss",
                "yyyyMMddHHmmss"};
        ArrayList<String> list = new ArrayList<>(Arrays.asList(dateFormat));
        if ("TIMESTAMP".equals(format)){
            return Timestamp.valueOf(sort);
        } else if (list.contains(format)){
            Date sortDate = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            try {
                sortDate = sdf.parse(sort);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
            return sortDate;
        }else {
            Date sortDate = new Date();
            sortDate.setTime(Long.parseLong(sort));
            return sortDate;
        }
    }

}
