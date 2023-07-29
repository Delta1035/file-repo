package com.wistron.avatar.sharerate.common.es;

import avatar.org.elasticsearch.client.RestHighLevelClient;
import com.wistron.avatar.sharerate.common.vo.Elasticsearch7Config;
import com.wistron.avatar.utils.es.context.ConnectionContext;
import com.wistron.avatar.utils.es.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

@Component
public class Es7ConnectionInit implements CommandLineRunner {

    @Autowired
    Elasticsearch7Config es7Config;

    final Base64.Decoder decoder = Base64.getDecoder();

    private RestHighLevelClient client;

    @Override
    public void run(String... args) throws Exception {
        ConnectionContext context = new ConnectionContext(
                es7Config.getAddress().toArray(new String[0])
                ,es7Config.getAccount()
                , es7Config.getPassword()
                ,new File(es7Config.getJdk().getPath()
                , es7Config.getJdk().getFile())
                ,es7Config.getJdk().getPassword());
        context.setEsMaxActiveConn(es7Config.getMaxActiveConn());
        context.setEsMaxPoolSize(es7Config.getMaxPoolSize());
        context.setBase64Jdk(true);
        client = ClientService.getInstance(context).getClient(); // get the first client to init connection
    }

    @PreDestroy
    public void destroy() throws IOException {
        client.close();
    }

}
