package com.wistron.avatar.common.vo;

import java.util.List;

public class RequestInfo {
    public String owner;
    public List<String> plant;

    @Override
    public String toString() {
        return "RequestInfo{" +
                "owner='" + owner + '\'' +
                ", plant=" + plant +
                '}';
    }
}