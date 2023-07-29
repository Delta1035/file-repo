package com.wistron.avatar.common.vo;

public class GenAtBaMoLineEffectiveResponse<T> {
    public String result;
    public String message;
    public T responseObject;

    @Override
    public String toString() {
        return "GenAtBaMoLineEffectiveResponse{" +
                "result='" + result + '\'' +
                ", message='" + message + '\'' +
                ", responseObject=" + responseObject +
                '}';
    }
}