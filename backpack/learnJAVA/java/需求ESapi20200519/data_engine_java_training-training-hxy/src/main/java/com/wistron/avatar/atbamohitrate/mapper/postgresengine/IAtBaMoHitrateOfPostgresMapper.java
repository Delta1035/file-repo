package com.wistron.avatar.atbamohitrate.mapper.postgresengine;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wistron.avatar.common.entity.postgresengine.AtBaMoHitrateOfPostgresEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository("hitrateMapperOfPostgresql")
public interface IAtBaMoHitrateOfPostgresMapper extends BaseMapper<AtBaMoHitrateOfPostgresEntity> {
}
