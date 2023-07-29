package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;

@Getter
@Setter
public class JobParamVo<T> {
    private String seq;

    @Valid
    private T requestInfo;
}
