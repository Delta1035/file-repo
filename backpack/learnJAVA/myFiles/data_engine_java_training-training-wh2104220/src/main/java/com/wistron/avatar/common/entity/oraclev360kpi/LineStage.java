package com.wistron.avatar.common.entity.oraclev360kpi;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@TableName(value = "SFC_LINESTAGE",schema = "public")
@Data
public class LineStage {
    String TIMESTAMP;
    String PLANT;
    String GROUPNAME;
    String LINE;
    String WORKCENTER;
    Integer OPERATIONSEQ;
    String STAGE;
    Integer PRIORITY;
    Date UPDT;
    String OFFSET;
}
