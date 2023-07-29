package com.wistron.avatar.sharerate.summary.sharerate.vo;

import java.util.List;

public class QueryVO {
    private String mode;
    private List<String> plant;
    private String dateFrom;
    private String dateTo;

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public List<String> getPlant() {
        return plant;
    }

    public void setPlant(List<String> plant) {
        this.plant = plant;
    }

    public String getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }

    public String getDateTo() {
        return dateTo;
    }

    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }
}
