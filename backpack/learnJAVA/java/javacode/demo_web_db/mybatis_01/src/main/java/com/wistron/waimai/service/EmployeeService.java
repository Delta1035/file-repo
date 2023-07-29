package com.wistron.waimai.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wistron.waimai.entity.Employee;
import org.springframework.stereotype.Service;

// 继承mybatis的父类 serviceImpl 接收mapper和entity
public interface EmployeeService extends IService<Employee> {
}
