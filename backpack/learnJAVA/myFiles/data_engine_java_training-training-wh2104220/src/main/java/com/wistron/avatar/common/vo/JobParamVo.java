package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobParamVo<T> {
    private String seq;
    private T requestInfo;

    @Override
    public String toString() {
        return "JobParamVo{" +
                "seq='" + seq + '\'' +
                ", requestInfo=" + requestInfo +
                '}';
    }
}
