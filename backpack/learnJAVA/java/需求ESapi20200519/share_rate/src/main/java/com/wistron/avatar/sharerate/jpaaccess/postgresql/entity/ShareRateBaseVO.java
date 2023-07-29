package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.math.BigDecimal;

@MappedSuperclass
public class ShareRateBaseVO {

    @Id
    @Column(name = "plant")
    private String plant;

    @Id
    @Column(name = "batchid")
    private String batchid;

    @Id
    @Column(name = "unique_group_id")
    private String uniqueGroupId;

    @Id
    @Column(name = "component")
    private String component;

    @Column(name = "component_description")
    private String componentDescription;

    @Column(name = "effective_flag")
    private String effectiveFlag;

    @Column(name = "effective_date")
    private String effectiveDate;

    @Column(name = "ineffective_date")
    private String ineffectiveDate;

    @Column(name = "effective_duration")
    private Double effectiveDuration;

    @Column(name = "target_rate")
    private Double targetRate;

    @Column(name = "target_qty")
    private Double targetQty;

    @Column(name = "actual_rate")
    private Double actualRate;

    @Column(name = "actual_qty")
    private Double actualQty;

    @Column(name = "hit_rate")
    private Double hitRate;

    @Column(name = "diff_rate")
    private Double diffRate;

    @Column(name = "diff_qty")
    private Double diffQty;

    @Column(name = "priority_hit")
    private Double priorityHit;

    @Column(name = "priority_diff")
    private Double priorityDiff;

    @Column(name = "sourcer_code")
    private String sourcerCode;

    @Column(name = "sourcer_name")
    private String sourcerName;

    @Column(name = "buyer_code")
    private String buyerCode;

    @Column(name = "buyer_name")
    private String buyerName;

    @Column(name = "material_category")
    private String materialCategory;

    @Column(name = "component_type_1")
    private String componentType1;

    @Column(name = "component_type_2")
    private String componentType2;

    @Column(name = "supply_type")
    private String supplyType;

    @Column(name = "service_mode")
    private String serviceMode;

    @Column(name = "replaced_group_id")
    private String replacedGroupId;

    @Column(name = "std_price_ntd")
    private BigDecimal stdPriceNtd;

    @Column(name = "target_amount_ntd")
    private BigDecimal targetAmountNtd;

    @Column(name = "actual_amount_ntd")
    private BigDecimal actualAmountNtd;

    @Column(name = "last_mrp_date")
    private String lastMrpDate;

    @Column(name = "last_mrp_onhand")
    private double lastMrpOnhand;

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getBatchid() {
        return batchid;
    }

    public void setBatchid(String batchid) {
        this.batchid = batchid;
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

    public String getComponentDescription() {
        return componentDescription;
    }

    public void setComponentDescription(String componentDescription) {
        this.componentDescription = componentDescription;
    }

    public String getEffectiveFlag() {
        return effectiveFlag;
    }

    public void setEffectiveFlag(String effectiveFlag) {
        this.effectiveFlag = effectiveFlag;
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public String getIneffectiveDate() {
        return ineffectiveDate;
    }

    public void setIneffectiveDate(String ineffectiveDate) {
        this.ineffectiveDate = ineffectiveDate;
    }

    public Double getEffectiveDuration() {
        return effectiveDuration;
    }

    public void setEffectiveDuration(Double effectiveDuration) {
        this.effectiveDuration = effectiveDuration;
    }

    public Double getTargetRate() {
        return targetRate;
    }

    public void setTargetRate(Double targetRate) {
        this.targetRate = targetRate;
    }

    public Double getTargetQty() {
        return targetQty;
    }

    public void setTargetQty(Double targetQty) {
        this.targetQty = targetQty;
    }

    public Double getActualRate() {
        return actualRate;
    }

    public void setActualRate(Double actualRate) {
        this.actualRate = actualRate;
    }

    public Double getActualQty() {
        return actualQty;
    }

    public void setActualQty(Double actualQty) {
        this.actualQty = actualQty;
    }

    public Double getHitRate() {
        return hitRate;
    }

    public void setHitRate(Double hitRate) {
        this.hitRate = hitRate;
    }

    public Double getDiffRate() {
        return diffRate;
    }

    public void setDiffRate(Double diffRate) {
        this.diffRate = diffRate;
    }

    public Double getDiffQty() {
        return diffQty;
    }

    public void setDiffQty(Double diffQty) {
        this.diffQty = diffQty;
    }

    public Double getPriorityHit() {
        return priorityHit;
    }

    public void setPriorityHit(Double priorityHit) {
        this.priorityHit = priorityHit;
    }

    public Double getPriorityDiff() {
        return priorityDiff;
    }

    public void setPriorityDiff(Double priorityDiff) {
        this.priorityDiff = priorityDiff;
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

    public String getMaterialCategory() {
        return materialCategory;
    }

    public void setMaterialCategory(String materialCategory) {
        this.materialCategory = materialCategory;
    }

    public String getComponentType1() {
        return componentType1;
    }

    public void setComponentType1(String componentType1) {
        this.componentType1 = componentType1;
    }

    public String getComponentType2() {
        return componentType2;
    }

    public void setComponentType2(String componentType2) {
        this.componentType2 = componentType2;
    }

    public String getSupplyType() {
        return supplyType;
    }

    public void setSupplyType(String supplyType) {
        this.supplyType = supplyType;
    }

    public String getServiceMode() {
        return serviceMode;
    }

    public void setServiceMode(String serviceMode) {
        this.serviceMode = serviceMode;
    }

    public String getReplacedGroupId() {
        return replacedGroupId;
    }

    public void setReplacedGroupId(String replacedGroupId) {
        this.replacedGroupId = replacedGroupId;
    }

    public BigDecimal getStdPriceNtd() {
        return stdPriceNtd;
    }

    public void setStdPriceNtd(BigDecimal stdPriceNtd) {
        this.stdPriceNtd = stdPriceNtd;
    }

    public BigDecimal getTargetAmountNtd() {
        return targetAmountNtd;
    }

    public void setTargetAmountNtd(BigDecimal targetAmountNtd) {
        this.targetAmountNtd = targetAmountNtd;
    }

    public BigDecimal getActualAmountNtd() {
        return actualAmountNtd;
    }

    public void setActualAmountNtd(BigDecimal actualAmountNtd) {
        this.actualAmountNtd = actualAmountNtd;
    }

    public String getLastMrpDate() {
        return lastMrpDate;
    }

    public void setLastMrpDate(String lastMrpDate) {
        this.lastMrpDate = lastMrpDate;
    }

    public double getLastMrpOnhand() {
        return lastMrpOnhand;
    }

    public void setLastMrpOnhand(double lastMrpOnhand) {
        this.lastMrpOnhand = lastMrpOnhand;
    }

}
