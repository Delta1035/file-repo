package com.wistron.avatar.common.vo.esvo;

import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.util.Map;

public class ConnectionContextVo {

    public ConnectionContextVo(String esAddress, String esMaxActiveConn, String esMaxPoolSize, String esAccount, String esPassword) {
        this(ConnectionContextVo.convertEsAddress(esAddress), esAccount, esPassword);
        this.esMaxActiveConn = esMaxActiveConn;
        this.esMaxPoolSize = esMaxPoolSize;
    }

    public ConnectionContextVo(String esAddress, String esMaxActiveConn, String esMaxPoolSize, String esAccount, String jksPassword, File keystore, String esPassword) {
        this(ConnectionContextVo.convertEsAddress(esAddress), esAccount, esPassword, keystore, jksPassword);
        this.esMaxActiveConn = esMaxActiveConn;
        this.esMaxPoolSize = esMaxPoolSize;
    }

    public ConnectionContextVo(String[] esAddress, String esAccount, String esPassword, File keystore, String jksPassword) {
        this.esAddress = convertEsAddress(esAddress);
        this.esAccount = esAccount;
        this.jksPassword = jksPassword;
        this.keystore = keystore;
        this.esPassword = esPassword;
    }

    public ConnectionContextVo(String[] esAddress, String esAccount, String esPassword) {
        this.esAddress = convertEsAddress(esAddress);
        this.esAccount = esAccount;
        this.esPassword = esPassword;
    }

    private final Map<String, Integer> esAddress;

    private final String esAccount;

    private String jksPassword;

    private File keystore;

    private final String esPassword;

    private String esMaxActiveConn = "10";

    private String esMaxPoolSize = "30";

    private int connectionTimeout = 5000000;

    private int socketTimeout = 6000000;

    private int connectionRequestTimeout = 300000;

    private boolean isBase64Jdk = false;

    private boolean isHttps = true;

    public Map<String, Integer> getEsAddress() {
        return esAddress;
    }

    public String getEsMaxActiveConn() {
        return esMaxActiveConn;
    }

    public void setEsMaxActiveConn(String esMaxActiveConn) {
        this.esMaxActiveConn = esMaxActiveConn;
    }

    public String getEsMaxPoolSize() {
        return esMaxPoolSize;
    }

    public void setEsMaxPoolSize(String esMaxPoolSize) {
        this.esMaxPoolSize = esMaxPoolSize;
    }

    public String getEsAccount() {
        return esAccount;
    }

    public String getJksPassword() {return jksPassword;}

    public File getKeystore() {
        return keystore;
    }

    public String getEsPassword() {
        return esPassword;
    }

    public int getConnectionTimeout() {
        return connectionTimeout;
    }

    public void setConnectionTimeout(int connectionTimeout) {
        this.connectionTimeout = connectionTimeout;
    }

    public int getSocketTimeout() {
        return socketTimeout;
    }

    public void setSocketTimeout(int socketTimeout) {
        this.socketTimeout = socketTimeout;
    }

    public int getConnectionRequestTimeout() {
        return connectionRequestTimeout;
    }

    public void setConnectionRequestTimeout(int connectionRequestTimeout) {
        this.connectionRequestTimeout = connectionRequestTimeout;
    }

    public boolean isBase64Jdk() {
        return isBase64Jdk;
    }

    public boolean isHttps() {
        return isHttps;
    }

    public void setHttps(boolean https) {
        isHttps = https;
    }

    public void setBase64Jdk(boolean base64Jdk) {
        isBase64Jdk = base64Jdk;
    }

    /**
     * Convert es address from string to ES cluster pair string array
     * @param esAddress ES cluster IP address string
     * @return ES cluster pair string array
     */
    private static String[] convertEsAddress(String esAddress){
        if(!StringUtils.isBlank(esAddress)){
            return StringUtils.splitPreserveAllTokens(esAddress, ",");
        }
        return new String[0];
    }

    /**
     * Convert es address from list to map
     * @param strings ES cluster pair string array
     * @return Map (IP, Port) for es address
     */
    private static Map<String, Integer> convertEsAddress(String[] strings){
        Map<String, Integer> retMap = Maps.newHashMap();
        for (String string : strings) {
            if(!StringUtils.isBlank(string)) {
                String[] split = StringUtils.splitPreserveAllTokens(string, ":");
                retMap.put(split[0], Integer.valueOf(split[1]));
            }
        }
        return retMap;
    }
}
