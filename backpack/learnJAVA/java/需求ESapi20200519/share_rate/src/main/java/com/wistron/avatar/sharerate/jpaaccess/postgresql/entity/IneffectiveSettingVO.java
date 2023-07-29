package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(IneffectiveSettingVOPK.class)
@Table(name = "data_engine_share_rate_setting", schema = "public")
public class IneffectiveSettingVO {

    @Id
    @Column(name = "plant")
    private String plant;

    @Column(name = "past_due_day_to_archive")
    private String pastDueDayToArchive;

    @Column(name = "past_due_day_to_housekeep")
    private String pastDueDayToHousekeep;

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getPastDueDayToArchive() {
        return pastDueDayToArchive;
    }

    public void setPastDueDayToArchive(String pastDueDayToArchive) {
        this.pastDueDayToArchive = pastDueDayToArchive;
    }

    public String getPastDueDayToHousekeep() {
        return pastDueDayToHousekeep;
    }

    public void setPastDueDayToHousekeep(String pastDueDayToHousekeep) {
        this.pastDueDayToHousekeep = pastDueDayToHousekeep;
    }
}
