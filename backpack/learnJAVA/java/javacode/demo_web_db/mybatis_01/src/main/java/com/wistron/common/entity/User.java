package com.wistron.common.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

//@Getter
//@Setter
@Data
public class User {
//    也可以叫做Dao
    private long id;
    private String name;
    private String password;
    private String tel;
    private Integer age;
}
