package com.wistron.avatar.common.util.esutil;

import com.google.common.collect.Lists;
import com.wistron.avatar.common.util.exceptionutil.EsExceptionUtil;
import com.wistron.avatar.common.vo.esvo.ConnectionContextVo;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HttpContext;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;

import javax.net.ssl.SSLContext;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class Es7ClientServiceUtil {

	private static ConnectionContextVo context = null;
	private static final String AUTHORIZATION = "Authorization";
	private RestHighLevelClient rhlEsClient = null;

	private Es7ClientServiceUtil() {
	}

	private Es7ClientServiceUtil(ConnectionContextVo context) throws EsExceptionUtil {
		this.initClient(context);
	}

	/**
	 * Get static connection context
	 *
	 * @return connection context for ClientService
	 */
	public static ConnectionContextVo getContext() {
		return context;
	}

	/**
	 * Get singleton ClientService instance
	 *
	 * @param context context for connection
	 * @return return ClientService instance
	 */
	public static Es7ClientServiceUtil getInstance(ConnectionContextVo context) {
		if (Es7ClientServiceUtil.context==null) {
			Es7ClientServiceUtil.context = context;
		}
		return SingletonHolder.instance;
	}

	/**
	 * Get ES rest high-level client
	 *
	 * @return ES rest high-level client
	 */
	public RestHighLevelClient getClient() {
		return rhlEsClient;
	}

	/**
	 * @param jksConn     java keystore file
	 * @param jksPassword java keystore password
	 * @return keystore for ES HTTPS connection
	 * @throws EsExceptionUtil exception for init client failed
	 */
	private KeyStore getKeyStore(File jksConn, String jksPassword) throws EsExceptionUtil {
		KeyStore keyStore;

		if (context.isBase64Jdk()) {
			String jksString = readLineByLineJava8(jksConn.getAbsolutePath());
			try (InputStream in = new ByteArrayInputStream(Base64.decodeBase64(jksString.getBytes()))) {
				keyStore = KeyStore.getInstance("jks");
				keyStore.load(in, jksPassword.toCharArray());
			} catch (CertificateException | IOException | KeyStoreException | NoSuchAlgorithmException e) {
				throw new EsExceptionUtil("es7 key Store获取失败");
			}
		} else {
			try (InputStream in = new FileInputStream(jksConn)) {
				keyStore = KeyStore.getInstance("jks");
				keyStore.load(in, jksPassword.toCharArray());
			} catch (CertificateException | IOException | KeyStoreException | NoSuchAlgorithmException e) {
				throw new EsExceptionUtil("es7 key Store获取失败");
			}
		}
		return keyStore;
	}

	private String readLineByLineJava8(String filePath) throws EsExceptionUtil {
		StringBuilder contentBuilder = new StringBuilder();

		try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
			stream.forEach(s -> contentBuilder.append(s).append("\n"));
		} catch (Exception e) {
			throw new EsExceptionUtil("es7 jks读取失败");
		}
		return contentBuilder.toString();
	}

	/**
	 * Generate Basic Authentication Header
	 */
	private BasicHeader generateAuthorizationHeader(String username, String password) {
		String charesetName = "US-ASCII";
		String auth = String.format("%s:%s", username, password);
		byte[] encodedAuth = Base64.encodeBase64(
				auth.getBytes(Charset.forName(charesetName)));
		String token = String.format("Basic %s", new String(encodedAuth));
		return new BasicHeader(AUTHORIZATION, token);
	}

	/**
	 * Generate HttpRequestInterceptor check if request headers miss Authorization
	 * auto add Authorization header
	 */
	private HttpRequestInterceptor generateRequestInterceptor(String username, String password) {
		return new HttpRequestInterceptor() {
			@Override
			public void process(HttpRequest request, HttpContext context){
				if (!request.containsHeader(AUTHORIZATION)) {
					BasicHeader header = generateAuthorizationHeader(username, password);
					request.addHeader(header);
				} else if (StringUtils.isEmpty(request.getFirstHeader(AUTHORIZATION).getValue())) {
					BasicHeader header = generateAuthorizationHeader(username, password);
					request.setHeader(header);
				}
			}
		};
	}

	/**
	 * Init ES rest high-level client
	 *
	 * @param context context for connection
	 * @throws EsExceptionUtil exception for init client failed
	 */
	public void initClient(ConnectionContextVo context) throws EsExceptionUtil {

		HttpHost[] hostArray = this.genHostArray(context.getEsAddress());
		RestClientBuilder builder = RestClient.builder(hostArray);

		try {
			HttpRequestInterceptor requestInterceptor = generateRequestInterceptor(context.getEsAccount(), context.getEsPassword());
			if (context.isHttps()) {
				final CredentialsProvider cdtProvider = new BasicCredentialsProvider();
				cdtProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(context.getEsAccount(), context.getEsPassword()));

				SSLContextBuilder sslContextBuilder = SSLContexts.custom().loadTrustMaterial(this.getKeyStore(context.getKeystore(), context.getJksPassword()), null);
				SSLContext sslContext = sslContextBuilder.build();

				builder.setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder
						.setMaxConnPerRoute(Integer.parseInt(context.getEsMaxActiveConn()))
						.setMaxConnTotal(Integer.parseInt(context.getEsMaxPoolSize()))
						.setDefaultCredentialsProvider(cdtProvider)
						.setSSLContext(sslContext)
						.addInterceptorFirst(requestInterceptor)
						.disableAuthCaching()
				);
			} else {
				builder.setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder
						.setMaxConnPerRoute(Integer.parseInt(context.getEsMaxActiveConn()))
						.setMaxConnTotal(Integer.parseInt(context.getEsMaxPoolSize()))
				);
			}

			builder.setRequestConfigCallback(requestConfigBuilder -> requestConfigBuilder
					.setConnectTimeout(context.getConnectionTimeout())
					.setSocketTimeout(context.getSocketTimeout())
					.setConnectionRequestTimeout(context.getConnectionRequestTimeout()));

			rhlEsClient = new RestHighLevelClient(builder);
		} catch (KeyStoreException | NoSuchAlgorithmException | KeyManagementException e) {
			throw new EsExceptionUtil("es7初始化失败");
		}
	}

	/**
	 * @param map split ES address map
	 * @return array of http host
	 */
	private HttpHost[] genHostArray(Map<String, Integer> map) {

		List<HttpHost> hostList = Lists.newArrayList();
		String protocolString = context.isHttps() ? "https":"http";

		for (Map.Entry<String, Integer> hostEntry : map.entrySet()) {
			hostList.add(new HttpHost(hostEntry.getKey(), hostEntry.getValue(), protocolString));

		}
		return hostList.toArray(new HttpHost[hostList.size()]);
	}

	public static void closeConnection() throws EsExceptionUtil {
		try {
			Es7ClientServiceUtil.getInstance(Es7ClientServiceUtil.getContext()).getClient().close();
		} catch (IOException e) {
			throw new EsExceptionUtil("关闭连接失败");
		}
	}

	private static final class SingletonHolder {

		private static Es7ClientServiceUtil instance = initClientService();

		/**
		 * es7初始化
		 */
		private static Es7ClientServiceUtil initClientService() {
			try {
				return new Es7ClientServiceUtil(context);
			} catch (EsExceptionUtil e) {
				throw new ExceptionInInitializerError(e);
			}
		}
	}

}
