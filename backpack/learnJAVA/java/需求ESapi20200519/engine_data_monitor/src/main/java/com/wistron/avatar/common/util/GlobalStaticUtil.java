package com.wistron.avatar.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GlobalStaticUtil {
    public static Object responseObject;

    public static boolean debugmode;        // 偵錯模式

    private GlobalStaticUtil() {}

    private static void setMode(boolean mode) {
        GlobalStaticUtil.debugmode = mode;
    }

    @Value("${spring.application.debugmode}")
    private void setDebugMode(boolean debugmode) {
        setMode(debugmode);
    }
}
