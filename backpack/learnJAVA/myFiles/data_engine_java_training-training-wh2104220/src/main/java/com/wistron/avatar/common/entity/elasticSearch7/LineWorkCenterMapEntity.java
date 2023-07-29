package com.wistron.avatar.common.entity.elasticSearch7;

import lombok.Data;

@Data
public class LineWorkCenterMapEntity {
    public String plant;
    public String groupname;
    public String line;
    public String workcenter;
    public Integer operationseq;
    public String stage;
    public Integer priority;
}
