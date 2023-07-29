package com.wistron.avatar.effective.mapper.postgresengine;

import com.wistron.avatar.common.entity.postgre.AtBaModifyLog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IPostgreModifyLogMapper {
    public void insertModifyInfo(AtBaModifyLog atBaModifyLog);

    public List<AtBaModifyLog> selectByUserAndTableName(AtBaModifyLog atBaModifyLog);

    public void updateModifyInfo(AtBaModifyLog atBaModifyLog);
}
