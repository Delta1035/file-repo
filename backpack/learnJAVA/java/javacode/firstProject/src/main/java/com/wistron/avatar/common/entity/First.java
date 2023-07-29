package com.wistron.avatar.common.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@TableName(value = "first",schema = "public")
public class First {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;

    private String name;

}
