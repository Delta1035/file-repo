package com.wistron.avatar.common.entity.postgresengine;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@TableName(value = "at_ba_modify_log", schema = "public")
public class AtBaModifyLogEntity {

    @TableId
    private String tableName;

    private Timestamp modifyTime;

    private String modifyUserCode;

}