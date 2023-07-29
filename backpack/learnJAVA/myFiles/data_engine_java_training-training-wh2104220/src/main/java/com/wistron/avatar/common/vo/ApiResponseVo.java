package com.wistron.avatar.common.vo;

public class ApiResponseVo<T> {
    private String result;
    private String message;
    private T responseObject;

    public ApiResponseVo() {
    }

    public ApiResponseVo(T responseObject) {
        this("0000000", "api return ok", responseObject);
    }

    public ApiResponseVo(String message, T responseObject, boolean isSuccess) {
//        this() 表示访问构造方法.
        this(isSuccess ? "0000000" : "9000000", message, responseObject);
    }
//构造函数
    public ApiResponseVo(String result, String message, T responseObject) {
        this.result = result;
        this.message = message;
        this.responseObject = responseObject;
    }

    public String getResult() {
        return this.result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getResponseObject() {
        return this.responseObject;
    }

    public void setResponseObject(T responseObject) {
        this.responseObject = responseObject;
    }
}
