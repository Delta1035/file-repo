package com.wistron.avatar.common.entity.postgresengine;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@TableName(value = "at_ba_mo_hitrate", schema = "public")
public class AtBaMoHitrateOfPostgresEntity {
    private Long batchId;

    private String plant;

    private String partNumber;
    
    @TableField("percen_tage")
    private Double percentage;

    @TableField("crby")
    private String createBy;

    @TableField("crdate")
    private Timestamp createDate;

    @TableField("updby")
    private String updateBy;

    @TableField("upddate")
    private Timestamp updateDate;
}
