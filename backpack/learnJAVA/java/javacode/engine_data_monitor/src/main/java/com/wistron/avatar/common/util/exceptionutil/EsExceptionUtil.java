package com.wistron.avatar.common.util.exceptionutil;

/**
 * @author: shannizhang
 * @date: 2021/10/27 15:43
 * @return
 */
public class EsExceptionUtil extends RuntimeException {

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

    public EsExceptionUtil(String description) {
        super(description);

        this.code = "9000000";
        this.description = description;
    }
}
