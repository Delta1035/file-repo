package com.wistron.avatar.common.vo.esvo;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
* es返回值类型，total与data
*/
public class EsSqlResultVo implements Serializable {

    private List<JSONObject> esDatas = new ArrayList<>();

    private String total;

    private JSONArray sort;

    public List<JSONObject> getEsDatas() {
        return esDatas;
    }

    public void setEsDatas(List<JSONObject> esDatas) {
        this.esDatas = esDatas;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public JSONArray getSort() {
        return sort;
    }

    public void setSort(JSONArray sort) {
        this.sort = sort;
    }
}
