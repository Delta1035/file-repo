package com.wistron.firstProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/httpTest")
public class HttpTestController {
    @GetMapping("/testGet")
    public void testGet(){
        System.out.println("测试get方法");
    }
}
