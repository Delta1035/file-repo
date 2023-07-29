package com.wistron.avatar.effective.mapper.oraclev360;
import com.wistron.avatar.common.entity.oracle.OracleEffective;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IOracleEffectiveMapper {
    List<OracleEffective> selectAll();
    List<OracleEffective> selectByPlants(List<String> plants);

    List<String> selectAllPlantName();

    void deleteByPlants(List<String> plants);
}
