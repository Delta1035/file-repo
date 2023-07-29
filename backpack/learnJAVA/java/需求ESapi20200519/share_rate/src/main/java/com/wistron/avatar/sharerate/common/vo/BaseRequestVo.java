package com.wistron.avatar.sharerate.common.vo;

public class BaseRequestVo<T> {

    private T inputObj;
    private String token;
    private String userID;

    public T getInputObj() {
        return inputObj;
    }

    public void setInputObj(T inputObj) {
        this.inputObj = inputObj;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

}
