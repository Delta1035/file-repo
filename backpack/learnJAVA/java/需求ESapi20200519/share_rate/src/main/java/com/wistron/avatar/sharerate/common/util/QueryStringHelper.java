package com.wistron.avatar.sharerate.common.util;

import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;

import java.util.List;

public class QueryStringHelper {

    public <T> List<List<T>> splitBatchQueryStringList(List<T> queryList) {

        List<List<T>> splitList = Lists.newArrayList();

        int count = 0;
        int batchSize = 500;

        List<T> copyList;

        if (CollectionUtils.isNotEmpty(queryList)) {
            while (true) {
                if (queryList.size() > count && (count + batchSize) < queryList.size()) {
                    copyList = queryList.subList(count, count + batchSize);
                    count += batchSize;
                    splitList.add(copyList);

                } else {
                    copyList = queryList.subList(count, queryList.size());
                    splitList.add(copyList);
                    break;
                }
            }
        }

        return splitList;
    }
}
