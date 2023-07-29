package com.wistron;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

//@MapperScan(basePackages = "com.wistron.common.mapper")//设置mapper扫描范围
@Slf4j //lombok提供的注解
@SpringBootApplication
//@MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
//@MapperScan("com.wistron.waimai")//设置mapper扫描范围
//@ComponentScan("com.wistron.employee")
public class Mybatis01Application {

	public static void main(String[] args) {
		SpringApplication.run(Mybatis01Application.class, args);
		log.info("waimai项目启动成功!");
	}

}
