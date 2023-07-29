package com.wistron.avatar.sharerate.common.vo;

public class JobParamVo<T> {

    private String seq;

    private T requestInfo;

    public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public T getRequestInfo() {
        return requestInfo;
    }

    public void setRequestInfo(T requestInfo) {
        this.requestInfo = requestInfo;
    }
}
