package com.wistron.avatar.atbamohitrate.mapper.oraclev360;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wistron.avatar.common.entity.oraclev360.AtBaMoHitrateOfOracleEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository("hitrateMapperOfOracle")
public interface IAtBaMoHitrateOfOracleMapper extends BaseMapper<AtBaMoHitrateOfOracleEntity> {
    ArrayList<AtBaMoHitrateOfOracleEntity> selectByPlants(ArrayList<String> plant);
    void deleteByPlants(ArrayList<String> plant);
}
