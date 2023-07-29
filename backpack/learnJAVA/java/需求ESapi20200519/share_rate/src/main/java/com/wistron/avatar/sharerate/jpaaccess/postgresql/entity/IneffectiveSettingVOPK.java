package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import java.io.Serializable;

public class IneffectiveSettingVOPK implements Serializable {
    private static final long serialVersionUID = 1L;
    private String plant;

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }
}

