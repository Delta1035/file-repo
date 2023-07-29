package com.wistron.avatar.sharerate.jpaconfig;

import org.hibernate.dialect.PostgreSQL10Dialect;

import java.sql.Types;

public class AvtPostgreSqlDialect extends PostgreSQL10Dialect {

    public AvtPostgreSqlDialect() {
        super();
        this.registerColumnType(Types.JAVA_OBJECT, "json");
    }
}

