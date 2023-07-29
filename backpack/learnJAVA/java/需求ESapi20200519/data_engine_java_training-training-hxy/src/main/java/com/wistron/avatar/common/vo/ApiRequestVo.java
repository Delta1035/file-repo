package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiRequestVo<T> {
    private T requestInfo;
}
