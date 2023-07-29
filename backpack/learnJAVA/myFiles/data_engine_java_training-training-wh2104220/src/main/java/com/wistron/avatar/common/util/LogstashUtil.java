package com.wistron.avatar.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogstashUtil {

    private LogstashUtil() {}

    public static final Logger logstash = LoggerFactory.getLogger(ConstUtil.LOGSTASH_SERVICE_NAME);

    /**
     * 寫入 Error level 信息
     * @param msg log 信息
     * @param ex exception
     */
    public static void writeErrorLog(String msg, Exception ex)
    {
        if (GlobalStaticUtil.debugmode) {
            logstash.warn(msg, ex);
        } else {
            logstash.error(msg, ex);
        }
    }

    /**
     * 寫入 Information level 信息
     * @param msg log 信息
     */
    public static void writeInfoLog(String msg)
    {
        logstash.info(msg);
    }

    /**
     * （強制）寫入 Information level 信息
     * @param msg log 信息
     * @param enforce 強制寫入
     */
    public static void writeInfoLog(String msg, boolean enforce)
    {
        if (enforce || GlobalStaticUtil.debugmode) {
            logstash.info(msg);
        }
    }

    /**
     * 寫入 Warning level 信息
     * @param msg log 信息
     * @param ex exception
     */
    public static void writeWarnLog(String msg, Exception ex)
    {
        logstash.warn(msg, ex);
    }

    /**
     * 寫入 Warning level 信息
     * @param msg log 信息
     */
    public static void writeWarnLog(String msg)
    {
        logstash.warn(msg);
    }
}
