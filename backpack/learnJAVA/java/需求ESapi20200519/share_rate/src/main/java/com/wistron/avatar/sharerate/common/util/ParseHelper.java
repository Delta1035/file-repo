package com.wistron.avatar.sharerate.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ParseHelper {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParseHelper.class);

    public static String intToTime(int temp) {
        String result = "";
        try {
            result = String.format("%04d", temp);
            result = result.substring(0, 2) + ":" + result.substring(2);
        } catch (Exception e) {
            LOGGER.error("intToTime error : ", e);
        }
        return result;
    }

}
