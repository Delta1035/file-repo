package com.wistron.waimai.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wistron.common.R;
import com.wistron.waimai.entity.Employee;
import com.wistron.waimai.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired(required=true)
    private EmployeeService employeeService;

    /**
     * 员工登陆
     * @param employee
     * @return
     */
    @PostMapping("/login")// @RequestBody 可以解析json格式的请求数据
//    登陆需要 username,password两个参数，需要和employee实体属性同名
    public R<Employee> login(HttpServletRequest request, @RequestBody Employee employee){
        System.out.println("进来了");
        // 1. 将页面提交的密码md5加密处理
        String password = employee.getPassword();
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        // 2. 查询数据库里面的数据比对
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Employee::getPassword,employee.getUsername());
        Employee emp = employeeService.getOne(queryWrapper);
        // 3. 如果没查到返回登陆失败
        if(emp == null){
            return R.error("登陆失败");
        }
        // 4. 密码比对, 如果不一致则返回登陆失败
        if(!emp.getPassword().equals(password)){
            return R.error("登陆失败");
        }
        // 5. 查看员工状态
        if(emp.getStatus() == 0){
            return R.error("此账号已被禁用");
        }

        request.getSession().setAttribute("employee",emp.getId());
        return R.success(emp);
    }

    @GetMapping("/test")
    void test(){
        System.out.println("进来了 test");
    }
}
