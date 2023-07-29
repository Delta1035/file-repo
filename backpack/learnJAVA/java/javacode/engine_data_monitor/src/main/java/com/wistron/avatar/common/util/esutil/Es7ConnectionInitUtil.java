package com.wistron.avatar.common.util.esutil;

import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import com.wistron.avatar.common.vo.esvo.ConnectionContextVo;
import com.wistron.avatar.common.vo.esvo.ElasticSearch7Vo;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;

@Component
public class Es7ConnectionInitUtil implements CommandLineRunner {

    @Resource
    ElasticSearch7Vo es7Config;

    private RestHighLevelClient client;

    @Override
    public void run(String... args){
        ConnectionContextVo context = new ConnectionContextVo(
                es7Config.getAddress().toArray(new String[0])
                ,es7Config.getAccount(), es7Config.getPassword()
                ,new File(es7Config.getJdk().getPath(), es7Config.getJdk().getFile())
                ,es7Config.getJdk().getPassword());
        context.setEsMaxActiveConn(es7Config.getMaxActiveConn());
        context.setEsMaxPoolSize(es7Config.getMaxPoolSize());
        context.setBase64Jdk(true);
        client = Es7ClientServiceUtil.getInstance(context).getClient(); // get the first client to init connection
    }

    @PreDestroy
    public void destroy() throws EsExceptionUtil {
        try {
            client.close();
        } catch (IOException e) {
            throw new EsExceptionUtil("es7 连接关闭失败");
        }
    }


    public RestHighLevelClient getClient(){
        return client;
    }
}
