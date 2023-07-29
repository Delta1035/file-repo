package com.wistron.waimai.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wistron.waimai.entity.Employee;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IEmployeeMapper extends BaseMapper<Employee> {
}
