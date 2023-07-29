package com.wistron.avatar.effective.service.postgre.impl;

import com.wistron.avatar.common.entity.postgre.AtBaModifyLog;
import com.wistron.avatar.effective.mapper.postgresengine.IPostgreModifyLogMapper;
import com.wistron.avatar.effective.service.postgre.IPostgreUpdateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostgreUpdateLogServiceImpl implements IPostgreUpdateLogService {

    @Autowired
    IPostgreModifyLogMapper postgreModifyLogMapper;

    public void updateTableModifiedInfo(AtBaModifyLog atBaModifyLog) {
        try {
            // 1. 更新之前判断是否存在
            System.out.println("开始");
            List<AtBaModifyLog> atBaModifyLogList = postgreModifyLogMapper.selectByUserAndTableName(atBaModifyLog);
            System.out.println("结束");
            System.out.println(atBaModifyLogList);
            if(atBaModifyLogList.size() == 1){
                postgreModifyLogMapper.updateModifyInfo(atBaModifyLog);
            }else{
                postgreModifyLogMapper.insertModifyInfo(atBaModifyLog);
            }
        }catch (Exception e){
            throw e;
        }
    }
}
