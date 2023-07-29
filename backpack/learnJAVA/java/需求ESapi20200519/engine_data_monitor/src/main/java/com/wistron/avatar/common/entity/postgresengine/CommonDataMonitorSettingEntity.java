package com.wistron.avatar.common.entity.postgresengine;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@TableName(value = "common_data_monitor_setting",schema = "public")
@Data
public class CommonDataMonitorSettingEntity{

    private String executionGroup;
    private String executionSession;
    private String checkingDataSource;
    private String checkingTable;
    private String checkingDimension;
    private String checkingProcessedTime;
    private String checkingProcessedTimeFormat;
    private String toleranceTimeSec;
    private String mailTo;
    private String mailTemplate;

}
