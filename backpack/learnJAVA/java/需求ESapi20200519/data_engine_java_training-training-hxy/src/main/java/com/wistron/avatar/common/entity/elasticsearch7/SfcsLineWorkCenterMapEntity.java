package com.wistron.avatar.common.entity.elasticsearch7;

import lombok.Data;

@Data
public class SfcsLineWorkCenterMapEntity {

    private String plant;

    private String groupname;

    private String line;

    private String workcenter;

    private Integer operationseq;

    private String stage;

    private Integer priority;
    
}
