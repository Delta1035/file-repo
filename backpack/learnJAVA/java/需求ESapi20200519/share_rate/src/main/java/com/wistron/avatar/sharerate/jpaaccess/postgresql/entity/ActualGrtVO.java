package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(ActualGrtVOPK.class)
@Table(name = "data_engine_share_rate_pn_actual_gr", schema = "public")
public class ActualGrtVO {
    @Id
    @Column(name = "plant")
    private String plant;

    @Id
    @Column(name = "component")
    private String component;

    @Id
    @Column(name = "receiving_date")
    private String receivingDate;

    @Column(name = "acc_qty")
    private Double acc_qty;

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getReceivingDate() {
        return receivingDate;
    }

    public void setReceivingDate(String receivingDate) {
        this.receivingDate = receivingDate;
    }

    public Double getAcc_qty() {
        return acc_qty;
    }

    public void setAcc_qty(Double acc_qty) {
        this.acc_qty = acc_qty;
    }
}
