package com.wistron.avatar.effective.service.postgre.impl;

import com.wistron.avatar.effective.mapper.postgresengine.IPostgreEffectiveMapper;
import com.wistron.avatar.common.entity.oracle.OracleEffective;
import com.wistron.avatar.common.entity.postgre.PostgreEffective;
import com.wistron.avatar.effective.service.postgre.IPostgreEffectiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

//@Transactional
@Service
public class PostgrePostgreEffectiveServiceImpl implements IPostgreEffectiveService {

    @Autowired
    public IPostgreEffectiveMapper postgreEffectiveMapper;
    @Override
    public List<PostgreEffective> getAll(){
        List<PostgreEffective> info = this.postgreEffectiveMapper.selectAll();
        return info;
    }

    @Override
    public List<PostgreEffective> selectByPlants(List<String> plants) {
        List<PostgreEffective> info = this.postgreEffectiveMapper.selectByPlants(plants);
        return info;
    }

    public void insertEffective(List<OracleEffective> effectives){
        this.postgreEffectiveMapper.insertEffective(effectives);
    }

    public void insertOneEffective(Map effective){
        this.postgreEffectiveMapper.insertOneEffective((effective));
    }
}
