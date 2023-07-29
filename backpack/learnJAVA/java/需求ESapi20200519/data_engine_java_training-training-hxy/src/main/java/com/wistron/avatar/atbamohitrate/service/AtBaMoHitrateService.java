package com.wistron.avatar.atbamohitrate.service;

import com.wistron.avatar.atbamohitrate.mapper.oraclev360.IAtBaMoHitrateOfOracleMapper;
import com.wistron.avatar.atbamohitrate.mapper.postgresengine.IAtBaMoHitrateOfPostgresMapper;
import com.wistron.avatar.atbamohitrate.mapper.postgresengine.IAtBaModifyLogMapper;
import com.wistron.avatar.common.entity.oraclev360.AtBaMoHitrateOfOracleEntity;
import com.wistron.avatar.common.entity.postgresengine.AtBaMoHitrateOfPostgresEntity;
import com.wistron.avatar.common.entity.postgresengine.AtBaModifyLogEntity;
import com.wistron.avatar.common.vo.GenAtBaMoHitrateParamVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

@Service
public class AtBaMoHitrateService {
    @Autowired
    private IAtBaMoHitrateOfOracleMapper atBaMoHitrateOfOracleMapper;
    @Autowired
    private IAtBaMoHitrateOfPostgresMapper atBaMoHitrateOfPostgresMapper;
    @Autowired
    private IAtBaModifyLogMapper atBaModifyLogMapper;

    public void genAtBaMoHitrate(GenAtBaMoHitrateParamVo genAtBaMoHitrateParamVo) {
        ArrayList<String> plantList = genAtBaMoHitrateParamVo.getPlant();
        String owner = genAtBaMoHitrateParamVo.getOwner();
        ArrayList<AtBaMoHitrateOfOracleEntity> hitrateListOfOracle = atBaMoHitrateOfOracleMapper.selectByPlants(plantList);
        Timestamp ts = new Timestamp(new Date().getTime());
        hitrateListOfOracle.forEach(eleOfOracle -> {
            AtBaMoHitrateOfPostgresEntity eleOfPostgresql = new AtBaMoHitrateOfPostgresEntity();
            BeanUtils.copyProperties(eleOfOracle, eleOfPostgresql);
            atBaMoHitrateOfPostgresMapper.insert(eleOfPostgresql);
            atBaMoHitrateOfOracleMapper.deleteByPlants(plantList);
        });
        AtBaModifyLogEntity modifyLog = new AtBaModifyLogEntity();
        modifyLog.setModifyUserCode(owner);
        modifyLog.setModifyTime(ts);
        modifyLog.setTableName("AT_BA_MO_HITRATE");
        atBaModifyLogMapper.updateById(modifyLog);
    }
}
