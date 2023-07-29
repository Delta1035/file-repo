package com.wistron.avatar.firstProject.mapper.postgresengine;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wistron.avatar.common.entity.First;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IFirstMapper extends BaseMapper<First> {

    First selectOneById(@Param("id") Integer id);

    List<First> selectListByName(String name);

    void insetOne(First first);

    void deleteOne(Integer id);
}