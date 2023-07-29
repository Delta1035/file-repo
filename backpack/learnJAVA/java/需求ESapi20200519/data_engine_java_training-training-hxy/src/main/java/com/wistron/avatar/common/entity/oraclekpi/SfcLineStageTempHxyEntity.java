package com.wistron.avatar.common.entity.oraclekpi;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Getter
@Setter
@TableName(value = "SFC_LINESTAGE_TEMP_HXY", schema = "VC137")
public class SfcLineStageTempHxyEntity {

    private String timestamp;

    @NotBlank
    private String plant;

    private String groupName;

    @NotBlank
    private String line;

    @NotBlank
    private String workCenter;

    private Integer operationSeq;

    @NotBlank
    private String stage;

    @NotNull
    private Integer priority;

    @NotNull
    @TableField("UPDT")
    private Timestamp updateTime;

    private String offset;
}
