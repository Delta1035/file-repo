package com.wistron.avatar.sharerate.jpaaccess.oracle.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@IdClass(CbgDataVOPK.class)
@Table(name = "SR_ITEM_ALT_AGRP_AVG", schema = "OAS")
public class CbgDataVO {
    @Id
    @Column(name = "VER")
    private String ver;

    @Id
    @Column(name = "PLANT")
    private String plant;

    @Id
    @Column(name = "SCODE")
    private String scode;

    @Column(name = "SNAME")
    private String sname;

    @Column(name = "BUYERCODE")
    private String buyercode;

    @Column(name = "BUYERNAME")
    private String buyername;

    @Column(name = "MPFLAG")
    private String mpflag;

    @Id
    @Column(name = "AGRP")
    private String agrp;

    @Id
    @Column(name = "SITEM")
    private String sitem;

    @Column(name = "MRPDATE")
    private Timestamp mrpdate;

    @Column(name = "BALANCE1")
    private Double balance1;

    @Column(name = "ADJ_PER")
    private Double adj_per;

    @Column(name = "INSDATE")
    private Timestamp insdate;

    @Column(name = "ONHAND")
    private Double onhand;

    @Column(name = "TOTALREQ")
    private Double totalreq;

    @Column(name = "BALANCE2")
    private Double balance2;

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

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getBuyercode() {
        return buyercode;
    }

    public void setBuyercode(String buyercode) {
        this.buyercode = buyercode;
    }

    public String getBuyername() {
        return buyername;
    }

    public void setBuyername(String buyername) {
        this.buyername = buyername;
    }

    public String getMpflag() {
        return mpflag;
    }

    public void setMpflag(String mpflag) {
        this.mpflag = mpflag;
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

    public Timestamp getMrpdate() {
        return mrpdate;
    }

    public void setMrpdate(Timestamp mrpdate) {
        this.mrpdate = mrpdate;
    }

    public Double getBalance1() {
        return balance1;
    }

    public void setBalance1(Double balance1) {
        this.balance1 = balance1;
    }

    public Double getAdj_per() {
        return adj_per;
    }

    public void setAdj_per(Double adj_per) {
        this.adj_per = adj_per;
    }

    public Timestamp getInsdate() {
        return insdate;
    }

    public void setInsdate(Timestamp insdate) {
        this.insdate = insdate;
    }

    public Double getOnhand() {
        return onhand;
    }

    public void setOnhand(Double onhand) {
        this.onhand = onhand;
    }

    public Double getTotalreq() {
        return totalreq;
    }

    public void setTotalreq(Double totalreq) {
        this.totalreq = totalreq;
    }

    public Double getBalance2() {
        return balance2;
    }

    public void setBalance2(Double balance2) {
        this.balance2 = balance2;
    }
}
