package com.wistron.waimai.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wistron.waimai.entity.Employee;
import com.wistron.waimai.mapper.IEmployeeMapper;
import org.springframework.stereotype.Service;

@Service    // 继承mybatis的父类 serviceImpl 接收mapper和entity
public class EmployeeServiceImpl extends ServiceImpl<IEmployeeMapper, Employee> {
}
