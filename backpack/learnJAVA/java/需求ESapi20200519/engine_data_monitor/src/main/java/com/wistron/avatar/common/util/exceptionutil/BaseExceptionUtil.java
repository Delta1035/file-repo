package com.wistron.avatar.common.util.exceptionutil;

/**
 * 全局异常工具类
 */
public class BaseExceptionUtil extends RuntimeException {

    private String code;
    private String description;//Step

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BaseExceptionUtil(ReturnCodeUtil code) {
        super(code.getDescription());

        this.code = code.getCode();
        this.description = code.getDescription();
    }

    public BaseExceptionUtil(String code, String description) {
        super(description);

        this.code = code;
        this.description = description;
    }
}
