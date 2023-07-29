package com.wistron.avatar.effective.mapper.postgresengine;

import com.wistron.avatar.common.entity.oracle.OracleEffective;
import com.wistron.avatar.common.entity.postgre.PostgreEffective;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IPostgreEffectiveMapper {
    public List<PostgreEffective> selectAll();
    public List<PostgreEffective> selectByPlants(List<String> plants);

    public void insertEffective(List<OracleEffective> effectives);

    public void insertOneEffective(Map effective);
}
