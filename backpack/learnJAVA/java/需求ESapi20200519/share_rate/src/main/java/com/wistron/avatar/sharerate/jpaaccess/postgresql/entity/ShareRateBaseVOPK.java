package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
public class ShareRateBaseVOPK implements Serializable {
    private static final long serialVersionUID = 1L;
    private String batchid;
    private String plant;
    private String uniqueGroupId;
    private String component;

    public String getBatchid() {
        return batchid;
    }

    public void setBatchid(String batchid) {
        this.batchid = batchid;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getUniqueGroupId() {
        return uniqueGroupId;
    }

    public void setUniqueGroupId(String uniqueGroupId) {
        this.uniqueGroupId = uniqueGroupId;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }
}
