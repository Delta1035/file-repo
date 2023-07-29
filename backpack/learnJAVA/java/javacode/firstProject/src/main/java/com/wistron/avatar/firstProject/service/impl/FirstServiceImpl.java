package com.wistron.avatar.firstProject.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.wistron.avatar.common.entity.First;
import com.wistron.avatar.firstProject.mapper.postgresengine.IFirstMapper;
import com.wistron.avatar.firstProject.service.IFirstService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("service1")
public class FirstServiceImpl implements IFirstService {

    @Resource
    private IFirstMapper firstMapper;
    @Override
    public JSONObject getFirstProject(Integer id) {
        try{
            JSONObject jsonObject = new JSONObject();
            Map map = new HashMap();
            map.put("id",1);
            map.put("name","This is dev");

            List<First> first = firstMapper.selectByMap(map);

            jsonObject.put("success",true);
            jsonObject.put("data",first);
            return jsonObject;
        }catch (Exception e){
            throw  e;
        }
    }
}
