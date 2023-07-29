package com.wistron.avatar.sharerate.summary.sharerate.vo;

public class ExchangeRateVO {
    /**
     * 匯率
     */
    String ukurs;
    /**
     * 原始幣別
     */
    String fcurr;
    /**
     * 轉換幣別
     */
    String tcurr;
    /**
     * 生效時間
     */
    String gdatu;

    public String getUkurs() {
        return ukurs;
    }

    public void setUkurs(String ukurs) {
        this.ukurs = ukurs;
    }

    public String getFcurr() {
        return fcurr;
    }

    public void setFcurr(String fcurr) {
        this.fcurr = fcurr;
    }

    public String getTcurr() {
        return tcurr;
    }

    public void setTcurr(String tcurr) {
        this.tcurr = tcurr;
    }


    public String getGdatu() {
        return gdatu;
    }

    public void setGdatu(String gdatu) {
        this.gdatu = gdatu;
    }
}
