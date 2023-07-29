package com.wistron.avatar.common.util.exceptionutil;

/**
 * 全局异常错误码枚举
 */
public enum ReturnCodeUtil {

	OK( "0000000","api return ok"),
	FAIL( "9000000","System error, please find support IT"),
    ;

	private String code;
	private String description ;

	ReturnCodeUtil(String code, String description ) {
		this.code = code;
		this.description  = description ;
	}

	public static ReturnCodeUtil lookup(final String code) {
		ReturnCodeUtil returnEnum = null;
		for (ReturnCodeUtil returnCode : ReturnCodeUtil.values()) {
			if (returnCode.getCode().equals(code)) {
				returnEnum = returnCode;
			}
		}
		return returnEnum;
	}

	public String getCode() {
		return code;
	}

	void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	void setDescription(String description) {
		this.description = description;
	}
}
