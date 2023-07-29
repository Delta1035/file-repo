
package com.wistron.avatar.common.controller;

import com.wistron.avatar.common.util.GlobalStaticUtil;
import com.wistron.avatar.common.util.LogstashUtil;
import com.wistron.avatar.common.util.exceptionutil.BaseExceptionUtil;
import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import com.wistron.avatar.common.vo.ApiResponseVo;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    /**
     * 全局exception处理
     */
    @ExceptionHandler(Throwable.class)
    public ApiResponseVo<Object> exceptionHandler(Throwable ex) {
        // 自定义异常
        if (ex instanceof EsExceptionUtil){
            EsExceptionUtil bEx = (EsExceptionUtil)ex;
            LogstashUtil.writeErrorLog(bEx.getDescription(), bEx);
            return new ApiResponseVo<>(bEx.getCode(), bEx.getDescription(), GlobalStaticUtil.responseObject);
        } else if (ex instanceof BaseExceptionUtil) {
            BaseExceptionUtil bEx = (BaseExceptionUtil)ex;

            LogstashUtil.writeErrorLog(bEx.getDescription(), bEx);
            return new ApiResponseVo<>(bEx.getCode(), bEx.getDescription(), GlobalStaticUtil.responseObject);
        } else {
            return new ApiResponseVo<>(ex.getMessage(), GlobalStaticUtil.responseObject, false);
        }
    }
}


