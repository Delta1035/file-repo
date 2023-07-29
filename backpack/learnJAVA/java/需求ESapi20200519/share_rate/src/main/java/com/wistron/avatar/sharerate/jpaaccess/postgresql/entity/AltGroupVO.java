package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@IdClass(AltGroupVOPK.class)
@Table(name = "data_engine_share_rate_alt_group_target", schema = "public")
public class AltGroupVO {
    @Id
    @Column(name = "version")
    private String version;

    @Id
    @Column(name = "plant")
    private String plant;

    @Id
    @Column(name = "group_id")
    private String groupId;

    @Id
    @Column(name = "component")
    private String component;

    @Column(name = "target_rate")
    private Double targetRate;

    @Column(name = "pn_type")
    private String pnType;

    @Column(name = "mrp_date")
    private Timestamp mrpDate;

    @Column(name = "sourcer_code")
    private String sourcerCode;

    @Column(name = "sourcer_name")
    private String sourcerName;

    @Column(name = "buyer_code")
    private String buyerCode;

    @Column(name = "buyer_name")
    private String buyerName;

    @Column(name = "total_req")
    private Double totalReq;

    @Column(name = "onhand")
    private Double onhand;

    @Column(name = "balance_1")
    private Double balance1;

    @Column(name = "balabce_2")
    private Double balabce2;

    @Column(name = "version_date")
    private String versionDate;

    @Column(name = "cbg_update_datetime")
    private Timestamp cbgUpdateDatetime;

    @Column(name = "avatar_update_datetime")
    private Timestamp avatarUpdateDatetime;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Double getTargetRate() {
        return targetRate;
    }

    public void setTargetRate(Double targetRate) {
        this.targetRate = targetRate;
    }

    public String getPnType() {
        return pnType;
    }

    public void setPnType(String pnType) {
        this.pnType = pnType;
    }

    public Timestamp getMrpDate() {
        return mrpDate;
    }

    public void setMrpDate(Timestamp mrpDate) {
        this.mrpDate = mrpDate;
    }

    public String getSourcerCode() {
        return sourcerCode;
    }

    public void setSourcerCode(String sourcerCode) {
        this.sourcerCode = sourcerCode;
    }

    public String getSourcerName() {
        return sourcerName;
    }

    public void setSourcerName(String sourcerName) {
        this.sourcerName = sourcerName;
    }

    public String getBuyerCode() {
        return buyerCode;
    }

    public void setBuyerCode(String buyerCode) {
        this.buyerCode = buyerCode;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public Double getTotalReq() {
        return totalReq;
    }

    public void setTotalReq(Double totalReq) {
        this.totalReq = totalReq;
    }

    public Double getOnhand() {
        return onhand;
    }

    public void setOnhand(Double onhand) {
        this.onhand = onhand;
    }

    public Double getBalance1() {
        return balance1;
    }

    public void setBalance1(Double balance1) {
        this.balance1 = balance1;
    }

    public Double getBalabce2() {
        return balabce2;
    }

    public void setBalabce2(Double balabce2) {
        this.balabce2 = balabce2;
    }

    public String getVersionDate() {
        return versionDate;
    }

    public void setVersionDate(String versionDate) {
        this.versionDate = versionDate;
    }

    public Timestamp getCbgUpdateDatetime() {
        return cbgUpdateDatetime;
    }

    public void setCbgUpdateDatetime(Timestamp cbgUpdateDatetime) {
        this.cbgUpdateDatetime = cbgUpdateDatetime;
    }

    public Timestamp getAvatarUpdateDatetime() {
        return avatarUpdateDatetime;
    }

    public void setAvatarUpdateDatetime(Timestamp avatarUpdateDatetime) {
        this.avatarUpdateDatetime = avatarUpdateDatetime;
    }
}
