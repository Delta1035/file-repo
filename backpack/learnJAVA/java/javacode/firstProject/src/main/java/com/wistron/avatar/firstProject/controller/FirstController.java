package com.wistron.avatar.firstProject.controller;

import com.alibaba.fastjson.JSONObject;
import com.wistron.avatar.common.entity.First;
import com.wistron.avatar.firstProject.service.IFirstService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

@RestControllerAdvice
@RequestMapping("/first")
public class FirstController {

    @Resource(name = "service1")
    private IFirstService firstService;

    @PostMapping("/getFirstProject")
    public JSONObject getFirstProject(Integer id){
        return firstService.getFirstProject(id);
    }

}
