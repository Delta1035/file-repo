package com.wistron.firstProject.controller;

import com.alibaba.fastjson.JSONObject;
import com.wistron.common.util.StringToAsc;
import com.wistron.firstProject.service.IFirstService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

//@Controller
@RestController
@RequestMapping("/first")// 设置请求头
public class FirstController {

    @Autowired
    private IFirstService firstService; // 自动导入service
    @GetMapping("/getCharacherTypeByASCII")
    public JSONObject getCharacherTypeByASCII(@RequestParam("target")String target){
        int length = target.length();
        String data = "长度不能大于1";
        JSONObject jsonObject = new JSONObject();
        // 算数运算符
        int[] Arithmetic = {42,43,45,47,37};
        Arrays.sort(Arithmetic);
        // 关系运算符
        int[] relation = {60,62};
        Arrays.sort(relation);
        // 逻辑运算符
        int[] logic = {33};
//        Arrays.sort(relation);
        if(length == 1){
            String asc = StringToAsc.stringTransformAscii(target);
            int intAsc = Integer.parseInt(asc);
            if(intAsc>=97 && intAsc <= 122){
                System.out.println("小写字母");
                data = "小写字母";
            }else if(intAsc>=65 && intAsc <= 81){
                System.out.println("大写字母");
                data = "大写字母";
            }else if(intAsc>=48 && intAsc <= 57){
                System.out.println("数字字符");
                data = "数字字符";
            }else if(Arrays.binarySearch(Arithmetic,intAsc) != -1){
                System.out.println("算数运算符");
                data = "算数运算符";
            }else if(Arrays.binarySearch(relation,intAsc) != -1){
                System.out.println("关系运算符");
                data = "关系运算符";
            }else if(Arrays.binarySearch(logic,intAsc) != -1){
                System.out.println("逻辑运算符"+Arrays.binarySearch(logic,intAsc));
                data = "逻辑运算符";
            }
            System.out.println("asc码为"+Integer.parseInt(asc));
        }
        System.out.println("请求"+target+"目标长度为: "+length);
//        jsonObject = firstService.getCharacherTypeByASCII();
        jsonObject.put("success",true);
        jsonObject.put("data",data);
        return jsonObject;
    }

    @GetMapping("/getUser")
    public JSONObject getUser(){
        System.out.println("请求");
        JSONObject jsonObject = new JSONObject();
        jsonObject = firstService.getCharacherTypeByASCII();
        return jsonObject;
    }

    @GetMapping("/hello")
    public String hello(){
        System.out.println("请求");
        return "请求";
    }
}
