package com.wistron.avatar.common.entity.postgre;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "at_ba_modify_log",schema = "public")
public class AtBaModifyLog {
    public String tableName;
    public Date modifyTime;
    public String modifyUserCode;
}
