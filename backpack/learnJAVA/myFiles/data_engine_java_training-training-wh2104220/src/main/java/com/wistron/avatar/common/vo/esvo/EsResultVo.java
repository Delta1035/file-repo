package com.wistron.avatar.common.vo.esvo;

import com.alibaba.fastjson.JSONArray;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
* 反馈给bean的查询结果
*/
public class EsResultVo<T> implements Serializable {

    private String total;

    private List<T> datas = new ArrayList<>();

    private JSONArray sort;

    public List<T> getDatas() {
        return datas;
    }

    public void setDatas(List<T> datas) {
        this.datas = datas;
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

    @Override
    public String toString() {
        return "EsResultVo{" +
                "total='" + total + '\'' +
                ", datas=" + datas +
                ", sort=" + sort +
                '}';
    }
}
