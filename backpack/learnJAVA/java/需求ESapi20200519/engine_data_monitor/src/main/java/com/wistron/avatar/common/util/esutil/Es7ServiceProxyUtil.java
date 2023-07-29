package com.wistron.avatar.common.util.esutil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wistron.avatar.common.vo.esvo.EsResultVo;
import com.wistron.avatar.common.vo.esvo.EsSqlResultVo;
import org.springframework.cglib.proxy.InvocationHandler;

import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Es7ServiceProxyUtil<T> implements InvocationHandler {

    private T target;

    public Es7ServiceProxyUtil(T target) {
        this.target = target;
    }

    /**
     * es7 代理方法
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        Class<?> returnType = method.getReturnType();
        Object result;
        EsResultVo<Object> res = new EsResultVo<>();

        if (returnType== EsResultVo.class) {
            Type type = method.getGenericReturnType();
            if (type instanceof ParameterizedType) {
                Type[] actualTypeArguments = ((ParameterizedType) type).getActualTypeArguments();
                //因为list泛型只有一个值 所以直接取0下标
                String typeName = actualTypeArguments[0].getTypeName();
                //真实返回值类型 Class对象
                Class<?> actualType = Class.forName(typeName);
                String index = String.valueOf(args[0]);
                Map pmap = (HashMap)args[1];
                String classUrl = method.getDeclaringClass().getName();
                String packageUrl = this.getMapperXmlUrl(classUrl);
                EsSqlResultVo esResult = Es7ClientFactoryUtil.getClient(packageUrl).query(classUrl+"."+method.getName(), pmap,index);

                List<Object> returnList = new ArrayList<>();

                for (JSONObject jsonObject:esResult.getEsDatas()){

                    Object obj = JSON.toJavaObject(jsonObject,actualType);
                    returnList.add(obj);
                }
                res.setDatas(returnList);
                res.setTotal(esResult.getTotal());
                res.setSort(esResult.getSort());
                result = res;
                return result;
            }
        }
        return null;


    }

    private String getMapperXmlUrl(String url){
        StringBuilder sb = new StringBuilder(url);
        int index = sb.indexOf("elasticsearch7");
        sb.delete(index+15,index+16);
        sb.insert(index+14,".xml");
        String s = sb.toString();

        return s.replace(".","/") + ".dsl.xml";
    }
}
