package com.wistron.avatar.sharerate.common.util;

import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class FormatConvertUtils {

    public String getNowDate() {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        return sdf.format(d);
    }

    /**
     * get date now: yyyy-MM-dd
     *
     * @return nowTime
     */
    public String getNowDateWithDash() {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(d);
    }

    /**
     * get time now: HH:mm:ss
     *
     * @return nowTime
     */
    public String getNowTime() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(cal.getTime());
    }

    /**
     * get datetime now: yyyy-MM-dd'T'HH:mm:ss
     *
     * @return nowTime
     */
    public String getNowTimeFull() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        return sdf.format(cal.getTime());
    }

    /**
     * get datetime now: yyyy-MM-dd HH:mm:ss
     *
     * @return nowTime
     */
    public String getNowTimeFull2() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(cal.getTime());
    }

    /**
     * get datetime now: yyyyMMddHHmmss
     *
     * @return nowTime
     */
    public String getNowTimeFull3() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(cal.getTime());
    }

    /**
     *
     * @return nowTime
     */
    public String getNowTimeFullWithMs() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        return sdf.format(cal.getTime());
    }


    /**
     * get datetime now: yyyy-MM-dd HH:mm:ss.SSS
     *
     * @return nowTime
     */
    public String getNowTimeWithMillis() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        return sdf.format(cal.getTime());
    }

    /**
     * get UTC time now: yyyy-MM-dd HH:mm:ss.SSS
     *
     * @return nowTime
     */
    public String getNowUtcTimeWithMillis() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
        return sdf.format(cal.getTime());
    }

    /**
     * get UTC time now: yyyy-MM-dd'T'HH:mm:ss.SSS
     *
     * @return nowTime
     */
    public String getNowUtcTimeFull() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss:SSS");
        return sdf.format(cal.getTime());
    }

    /**
     * convert date format: yyyyMMdd to yyyy-MM-dd if input date is 00000000 ,
     * return String
     *
     */
    public String convertDate(String date) throws ParseException {

        if ("00000000".equals(date)) {
            return null;
        }

        Date tradeDate = new SimpleDateFormat("yyyyMMdd").parse(date);
        return new SimpleDateFormat("yyyy-MM-dd").format(tradeDate);
    }

    /**
     * in: 1. yyyy-MM-dd HH:mm:ss 2. yyyymmddhhmmss 3. yyyy-MM-dd 4. yyyyMMdd
     *
     * out: java.sql.Timestamp
     *
     */
    public java.sql.Timestamp convertToSqlTimestamp(String dtime) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat();

        if (StringUtils.isBlank(dtime) || "00000000".equals(dtime)) {
            return null;
        }
        if (dtime.length() == 17) {
            sdf.applyPattern("yyyyMMddHHmmssSSS");
        } else if (dtime.length() >= 19) {
            sdf.applyPattern("yyyy-MM-dd HH:mm:ss");
        } else if (dtime.length() > 10) {
            sdf.applyPattern("yyyyMMddHHmmss");
        } else if (dtime.length() == 10) {
            sdf.applyPattern("yyyy-MM-dd");
        } else if (dtime.length() == 8) {
            sdf.applyPattern("yyyyMMdd");
        }
        Date date = sdf.parse(dtime);

        sdf.applyPattern("yyyy-MM-dd HH:mm:ss");

        return java.sql.Timestamp.valueOf(sdf.format(date));
    }

    public String getDiffSec(Date startDate, Date endDate) {
        long diff = (endDate.getTime() - startDate.getTime()) / 1000;
        return diff + " Sec.";
    }
}
