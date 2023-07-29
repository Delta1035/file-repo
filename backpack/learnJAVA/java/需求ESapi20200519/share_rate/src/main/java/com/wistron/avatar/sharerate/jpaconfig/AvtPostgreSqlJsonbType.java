package com.wistron.avatar.sharerate.jpaconfig;

import com.google.gson.Gson;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.type.SerializationException;
import org.hibernate.usertype.UserType;
import org.postgresql.util.PGobject;
import org.springframework.util.ObjectUtils;

import java.io.Serializable;
import java.lang.reflect.Type;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Map;

public class AvtPostgreSqlJsonbType implements UserType {

    private final Gson gson = new Gson();

    @Override
    public int[] sqlTypes() {
        return new int[] { Types.JAVA_OBJECT };
    }

    @Override
    public Class<?> returnedClass() {
        return Object.class;
    }

    public Type returnType() {
        return Map.class;
    }

    @Override
    public boolean equals(Object x, Object y) throws HibernateException {
        return ObjectUtils.nullSafeEquals(x, y);
    }

    @Override
    public int hashCode(Object x) throws HibernateException {
        return x == null ? 0 : x.hashCode();
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names,
                              SharedSessionContractImplementor sharedSessionContractImplementor, Object owner)
            throws HibernateException, SQLException {
        Object returnObj = null;
        Object obj = rs.getObject(names[0]);
        if (obj == null) {
            return null;
        }
        PGobject o = (PGobject) obj;
        if (o.getValue() != null && !"".equals(o.getValue())) {
            try {
                returnObj = gson.fromJson(o.getValue(), this.returnType());
            } catch (Exception e) {
                throw new HibernateException("Failed to do nullSafeGet. Error: {0}", e);
            }
        }
        return returnObj;
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index,
                            SharedSessionContractImplementor sharedSessionContractImplementor) throws HibernateException, SQLException {
        if (value == null) {
            st.setNull(index, Types.OTHER);
        } else {
            try {
                st.setObject(index, gson.toJson(value), Types.OTHER);
            } catch (SQLException e) {
                throw new SQLException("Failed to do nullSafeSet. Error: {0}", e);
            } catch (Exception e) {
                throw new HibernateException("Failed to do nullSafeSet. Error: {0}", e);
            }
        }
    }

    @Override
    public Object deepCopy(Object originalValue) throws HibernateException {
        if (originalValue != null) {
            try {
                return gson.fromJson(gson.toJson(originalValue), this.returnType());
            } catch (Exception e) {
                throw new HibernateException("Failed to deep copy object. Error: {0}", e);
            }
        }
        return null;
    }

    @Override
    public boolean isMutable() {
        return true;
    }

    @Override
    public Serializable disassemble(Object value) throws HibernateException {
        Object copy = deepCopy(value);

        if (copy instanceof Serializable) {
            return (Serializable) copy;
        }
        throw new SerializationException(
                String.format("Cannot serialize '%s', %s is not Serializable.", value, value.getClass()), null);
    }

    @Override
    public Object assemble(Serializable cached, Object o) throws HibernateException {
        return deepCopy(cached);
    }

    @Override
    public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return deepCopy(original);
    }
}

