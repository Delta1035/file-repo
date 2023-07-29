package com.wistron.avatar.common.vo.esvo;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
*
* 将dsl.xml语句转换成es查询语句
*/
public class EsDslToSqlVo implements Serializable {

    private String sql;

    private String command;

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public String getCommand() {
        return commondMap.get(command);
    }

    public void setCommand(String command) {
        this.command = command;
    }

    private static Map<String,String> commondMap = new HashMap<>();

    static{

        commondMap.put("SELECT","_search");
        commondMap.put("UPDATE","_update_by_query");
        commondMap.put("DELETE","_delete_by_query");
        commondMap.put("INSERT","_doc");
    }
}
