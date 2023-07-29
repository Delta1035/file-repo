package com.wistron.avatar.sharerate.common.vo;

public class AvatarResponse {
    private String result;
    private String message;
    private Object responseObject;

    public AvatarResponse() {
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

    public Object getResponseObject() {
        return this.responseObject;
    }

    public void setResponseObject(Object responseObject) {
        this.responseObject = responseObject;
    }
}
