package com.wistron.avatar.effective.service.oracle.impl;

import com.wistron.avatar.common.entity.oracle.OracleEffective;
import com.wistron.avatar.effective.mapper.oraclev360.IOracleEffectiveMapper;
import com.wistron.avatar.effective.service.oracle.IOracleEffectiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OracleEffectiveServiceImpl implements IOracleEffectiveService {
    @Autowired
    IOracleEffectiveMapper oracleEffectiveMapper;

    @Override
    public List<OracleEffective> getAll(){
        List<OracleEffective> info = this.oracleEffectiveMapper.selectAll();
        System.out.println(info);
        return info;
    }

    @Override
    public List<OracleEffective> selectByPlants(List<String> plants) {
        List<OracleEffective> info = this.oracleEffectiveMapper.selectByPlants(plants);
        return info;
    }

    @Override
    public void deleteByPlants(List<String> plants) {
        this.oracleEffectiveMapper.deleteByPlants(plants);
    }

    public List<String> selectAllPlantName(){
        return this.oracleEffectiveMapper.selectAllPlantName();
    }
}
