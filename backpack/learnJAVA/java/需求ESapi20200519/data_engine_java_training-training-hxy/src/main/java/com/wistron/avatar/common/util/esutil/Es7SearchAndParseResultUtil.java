package com.wistron.avatar.common.util.esutil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.wistron.avatar.ApplicationContextProvider;
import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import com.wistron.avatar.common.vo.esvo.EsDslToSqlVo;
import com.wistron.avatar.common.vo.esvo.EsSqlResultVo;
import org.apache.ibatis.mapping.MappedStatement;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.WrapperQueryBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Es7SearchAndParseResultUtil {
    private static final String SORT_RULE = "sortRule";
    private final DSLConfigurationUtil configuration;

    public Es7SearchAndParseResultUtil(DSLConfigurationUtil configuration) {
        this.configuration = configuration;
    }

    public Es7ConnectionInitUtil getEs7ConectionInit() {
        return (Es7ConnectionInitUtil) ApplicationContextProvider.getBean("Es7ConnectionInit");
    }

    /**
     * 转换查询语句 写入参数
     */
    private EsDslToSqlVo generateDsl(String mapperId, Object param) {
        MappedStatement statement = configuration.getMappedStatement(mapperId);
        EsDslToSqlVo sqlDesc = new EsDslToSqlVo();
        sqlDesc.setCommand(statement.getSqlCommandType().name());
        sqlDesc.setSql(statement.getBoundSql(param).getSql());
        return sqlDesc;
    }

    /**
     * 发送sql进行查询
     */
    private String sendQuery(String index, String dslStr){
        Es7ConnectionInitUtil es7ConnectionInitUtil = ApplicationContextProvider.getBean(Es7ConnectionInitUtil.class);
        RestHighLevelClient client = es7ConnectionInitUtil.getClient();
        SearchRequest searchRequest = new SearchRequest(index);
        Map<?, ?> maps = (Map<?, ?>)JSON.parse(dslStr);
        List<Map<?, ?>> sortList = this.getSortKeyAndRules(maps);
            SearchSourceBuilder sourceBuilder = this.generateSearch(maps,sortList);
        searchRequest.source(sourceBuilder);
        SearchResponse queryResult = null;
        try {
             queryResult = client.search(searchRequest, RequestOptions.DEFAULT);
        }catch (Exception e){
            throw new EsExceptionUtil("es7查询错误");
        }
        return queryResult.toString();
    }

    /**
     * 解析查询结果
     */
    private EsSqlResultVo parse(String responeJsonStr) {
        EsSqlResultVo esResult = new EsSqlResultVo();
        JSONObject resultJson = JSON.parseObject(responeJsonStr);
        List<JSONObject> results = new ArrayList<>();
        if (resultJson.containsKey("hits")) {
            JSONArray innerHits = resultJson.getJSONObject("hits").getJSONArray("hits");
            JSONArray sortResult = new JSONArray();
            /* 剔除外层元数据，组装最后结果集 */
            for (Object hit : innerHits) {
                JSONObject result = ((JSONObject) hit).getJSONObject("_source");
                if (result != null) {
                    results.add(result);
                }
                sortResult = ((JSONObject) hit).getJSONArray("sort");
            }
            String total = ((JSONObject)resultJson.get("hits")).get("total").toString();
            esResult.setTotal(total);
            esResult.setEsDatas(results);
            esResult.setSort(sortResult);
        }
        return esResult;
    }

    /**
     * es查询方法
     */
    public EsSqlResultVo query(String mapperId, Object param, String index) throws EsExceptionUtil {
        String responeStr;
        EsDslToSqlVo dslStr = this.generateDsl(mapperId, param);
        responeStr = this.sendQuery(index, dslStr.getSql());
        return this.parse(responeStr);
    }

    private List<Map<?, ?>> getSortKeyAndRules(Map<?, ?> maps){
        List<Map<?, ?>> timeTypeList = new ArrayList<>();
        List<?> time = (List<?>)maps.get("sort");

        if (null != time && !time.isEmpty()) {
            Object jsonObject = time.get(0);
            Map<?, ?> map = JSON.parseObject(JSON.toJSONString(jsonObject), Map.class);

            for (Map.Entry<?, ?> me : map.entrySet()) {
                Map<String, Object> hashMap = new HashMap<>();

                hashMap.put("sortKey", me.getKey());

                Map<?, ?> map2 = JSON.parseObject(JSON.toJSONString(me.getValue()), Map.class);

                if (map2.get("order").equals("desc")){
                    hashMap.put(SORT_RULE, SortOrder.DESC);
                } else {
                    hashMap.put(SORT_RULE, SortOrder.ASC);
                }

                timeTypeList.add(hashMap);
            }
        }

        return timeTypeList;
    }

    private SearchSourceBuilder generateSearch(Map<?, ?> map, List<Map<?, ?>> sortList){
        String dsl = map.get("query").toString();
        int from = Integer.parseInt(map.get("from").toString());
        int size = Integer.parseInt(map.get("size").toString());
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        WrapperQueryBuilder wrapperQueryBuilder = new WrapperQueryBuilder(dsl);
        sourceBuilder.query(wrapperQueryBuilder);
        if (!sortList.isEmpty()){
            for (Map<?, ?> hashMap : sortList){
                sourceBuilder.sort(hashMap.get("sortKey").toString(), (SortOrder) hashMap.get(SORT_RULE));
            }
        }
        sourceBuilder.from(from);
        sourceBuilder.size(size);
        return sourceBuilder;
    }
}

