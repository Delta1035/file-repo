package com.wistron.avatar.common.entity.oraclev360;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@TableName(value = "AT_BA_MO_HITRATE", schema = "AVATAR")
public class AtBaMoHitrateOfOracleEntity {
    private Long batchId;

    private String plant;

    private String partNumber;

    private Double percentage;

    private String createBy;

    private Timestamp createDate;

    private String updateBy;

    private Timestamp updateDate;
}
