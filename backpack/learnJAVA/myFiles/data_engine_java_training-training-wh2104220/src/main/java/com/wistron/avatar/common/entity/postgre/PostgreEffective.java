package com.wistron.avatar.common.entity.postgre;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@TableName(value = "at_ba_mo_lineeffective",schema = "public")
@Data
public class PostgreEffective {
    private String plant;
    private String process;
    private String line;
    private String crby;
    private String updby;
    private String lineTop;
    private String lineBtm;
    private String lineChange;
    private Date crdate;
    private Date upddate;

}
