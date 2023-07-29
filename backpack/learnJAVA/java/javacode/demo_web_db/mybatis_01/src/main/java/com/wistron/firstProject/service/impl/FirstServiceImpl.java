package com.wistron.firstProject.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.wistron.common.entity.User;
import com.wistron.firstProject.service.IFirstService;
import org.springframework.stereotype.Service;

@Service
public class FirstServiceImpl implements IFirstService {


    @Override
    public JSONObject getCharacherTypeByASCII() {
        JSONObject jsonObject = new JSONObject();
        User user = new User();
        user.setAge(18);
        user.setName("法外狂徒");
        jsonObject.put("success",true);
        jsonObject.put("data",user);
        return jsonObject;
    }
}
