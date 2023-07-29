package com.wistron.waimai.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;// 数据库给的是Bigint
    private String username;
    private String name;
    private String password;
    private String phone;
    private String sex;
    private String idNumber;// id_number
    private Integer status;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    @TableField(fill = FieldFill.INSERT)
    private Long createUser;
    @TableField(fill = FieldFill.UPDATE)
    private Long updateUser;

}
