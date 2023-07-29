package com.wistron.avatar.common.entity.oracle;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;
@TableName(value = "AT_BA_MO_LINEEFFECTIVE",schema = "public")
@Data
public class OracleEffective {
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
