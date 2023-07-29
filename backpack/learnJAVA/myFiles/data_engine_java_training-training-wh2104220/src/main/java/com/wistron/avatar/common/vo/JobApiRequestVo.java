package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobApiRequestVo<T> {
    private String jobApi;
    private JobParamVo<T> jobParameter;
}