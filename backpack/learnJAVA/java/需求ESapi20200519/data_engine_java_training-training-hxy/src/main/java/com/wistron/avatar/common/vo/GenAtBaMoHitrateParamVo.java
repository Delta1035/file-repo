package com.wistron.avatar.common.vo;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
@Setter

public class GenAtBaMoHitrateParamVo {
    @NotNull(message = "plant不能为空")
    private ArrayList<String> plant;

    @NotBlank(message = "owner不能为空")
    private String owner;

}
