package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import java.io.Serializable;

public class ActualGrtVOPK implements Serializable {
    private static final long serialVersionUID = 1L;
    private String plant;
    private String component;
    private String receivingDate;

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
}
