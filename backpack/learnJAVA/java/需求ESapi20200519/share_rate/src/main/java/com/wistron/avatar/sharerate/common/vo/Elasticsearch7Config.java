package com.wistron.avatar.sharerate.common.vo;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "spring.elasticsearch7")
public class Elasticsearch7Config {

    private List<String> address;

    private String account;

    private String password;

    private String maxActiveConn;

    private String maxPoolSize;

    private Jdk jdk;

    public static class Jdk {

        private String password;

        private String path;

        private String file;

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }
    }

    public List<String> getAddress() {
        return address;
    }

    public void setAddress(List<String> address) {
        this.address = address;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMaxActiveConn() {
        return maxActiveConn;
    }

    public void setMaxActiveConn(String maxActiveConn) {
        this.maxActiveConn = maxActiveConn;
    }

    public String getMaxPoolSize() {
        return maxPoolSize;
    }

    public void setMaxPoolSize(String maxPoolSize) {
        this.maxPoolSize = maxPoolSize;
    }

    public Jdk getJdk() {
        return jdk;
    }

    public void setJdk(Jdk jdk) {
        this.jdk = jdk;
    }
}
