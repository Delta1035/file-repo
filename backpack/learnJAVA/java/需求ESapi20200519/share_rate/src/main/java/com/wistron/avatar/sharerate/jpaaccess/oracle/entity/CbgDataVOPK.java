package com.wistron.avatar.sharerate.jpaaccess.oracle.entity;

import java.io.Serializable;

public class CbgDataVOPK implements Serializable {
    private static final long serialVersionUID = 1L;
    private String ver;
    private String plant;
    private String scode;
    private String agrp;
    private String sitem;

    public String getVer() {
        return ver;
    }

    public void setVer(String ver) {
        this.ver = ver;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getScode() {
        return scode;
    }

    public void setScode(String scode) {
        this.scode = scode;
    }

    public String getAgrp() {
        return agrp;
    }

    public void setAgrp(String agrp) {
        this.agrp = agrp;
    }

    public String getSitem() {
        return sitem;
    }

    public void setSitem(String sitem) {
        this.sitem = sitem;
    }
}
