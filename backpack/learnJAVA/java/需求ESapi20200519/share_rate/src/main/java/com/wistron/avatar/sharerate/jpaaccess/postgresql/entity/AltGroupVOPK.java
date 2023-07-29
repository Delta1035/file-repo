package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import java.io.Serializable;

public class AltGroupVOPK implements Serializable {
    private static final long serialVersionUID = 1L;
    private String version;
    private String plant;
    private String groupId;
    private String component;

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
}
