package com.wistron.avatar.sharerate.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class ZapTestController {
    @GetMapping("/zaptest")
    public String zapTest(HttpServletResponse httpServletResponse) {
        httpServletResponse.addHeader("X-Content-Type-Options", "nosniff");
        return "test ok";
    }
}
