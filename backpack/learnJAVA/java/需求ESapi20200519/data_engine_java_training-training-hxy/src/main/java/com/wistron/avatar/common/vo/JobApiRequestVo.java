package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;

@Getter
@Setter
public class JobApiRequestVo<T> {
    private String jobApi;

    @Valid
    private JobParamVo<T> jobParameter;
}