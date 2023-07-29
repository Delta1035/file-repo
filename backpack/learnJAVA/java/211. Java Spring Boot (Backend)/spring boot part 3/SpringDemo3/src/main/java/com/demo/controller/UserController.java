package com.demo.controller;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avatar.DBConn.DataSourceConfig;
import com.demo.model.MixUser;
import com.demo.model.OpenWeather;
import com.demo.model.Token;
import com.demo.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@RequestMapping("/User")
//@CrossOrigin
public class UserController {
	
	private Gson gson = new Gson();
	
	@RequestMapping(value = "/hello",method=RequestMethod.GET)//http://localhost:8080/hello?name=abcd
	public String Hello(@RequestParam(value="name", defaultValue="World") String name)
	{
		return  "Hi "+name;
	}
	
	@RequestMapping(value = "/hello/{id}",method=RequestMethod.GET)//http://localhost:8080/hello/1?name=Chandra
	public String Hello2(@RequestParam(value="name", defaultValue="World") String name,@PathVariable("id") int id)
	{
		return  "Hi "+name +", Your ID is "+id+" , This is GET Method";
	}
	
	@RequestMapping(value = "/one_user",method=RequestMethod.POST)
	  public ResponseEntity<User> singlePerson(@RequestBody User user)
	    {
	    	if(user != null)
	    	{
	    		user.name="Mr. "+user.name;
	    		user.address="新竹市科學園區新安路五號";
	    	}
	    	return new ResponseEntity<User>(user, HttpStatus.OK);
	    }
	
	@RequestMapping(value = "/multi_user",method=RequestMethod.POST)
    public ResponseEntity<List<User>> multiPersons(@RequestBody List<User> users)
    {
    	if(users != null)
    	{ 
    		users.stream().forEach(c -> c.setName("Mr. "+c.name));
    	}
    	return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
	
	 @RequestMapping(value = "/mix_user",method=RequestMethod.POST)
	    public ResponseEntity<MixUser> mixPersons(@RequestBody MixUser mixUser)
	    {
	    	if(mixUser != null)
	    	{
	    		mixUser.users.stream().forEach(c -> c.setName("Mr. "+c.name));
	    		mixUser.getOtherUser();
	    	}
	    	return new ResponseEntity<MixUser>(mixUser, HttpStatus.OK);
	    }
	 @RequestMapping(value = "/test2", method = RequestMethod.POST)
		public String gettest2(@RequestBody List<Object> param) {

			ObjectMapper jsonObjectMapper = new ObjectMapper();
			//使用ObjectMapper ,把傳進來的參數轉到我們要的model
			Token getToken = jsonObjectMapper.convertValue(param.get(0), Token.class);
			User getUser = jsonObjectMapper.convertValue(param.get(1), User.class);

			return getToken.getToken() + "~~" + getUser.getName();

		}
	 
	 @RequestMapping(value = "/test3", method = RequestMethod.POST)
		public List<Map<String, Object>> gettest3(@RequestBody Object param) 
	  {
		  JsonObject jobj= new JsonObject();
		  JsonParser parser = new JsonParser();
		 
		  jobj = parser.parse(param.toString()).getAsJsonObject();
		 
			JsonElement jElm = jobj.get("ResponseObject").getAsJsonObject().get("PartNumber");
			Map<String, Double> map = new HashMap<String, Double>();
			map = (Map<String, Double>) gson.fromJson(jElm, map.getClass());
			
			
			Map<String, Object> data = new HashMap<String, Object>();
				List<Map<String, Object>> Result=new ArrayList<Map<String, Object>> ();
			
			
			for (String key : map.keySet())
			{
				//用key來取得value
				double getValue = map.get(key);
				data = new HashMap<String, Object>();
				
				data.put("MATNR",key);
	      		data.put("TOTAL_QTY", ""+getValue);
	      		Result.add(data);
			}
			return Result;
		}
	 @RequestMapping(value = "/weather",method=RequestMethod.GET) // http://localhost:8080/User/weather
	    public OpenWeather GetWeather()
	    {
		
		  	OpenWeather weather= new OpenWeather();

		  	//JSONArray ja=new JSONArray();
			JsonArray ja = new JsonArray();
		  	JsonObject param = new JsonObject();
		  	param.addProperty("Token", "SAP" );
			//ja.put(param);
			ja.add(param.toString());
			
			param = new JsonObject();
			param.addProperty("name", "hsinchu" );
			param.addProperty("language", "en" );
			//ja.put(param);
			ja.add(param.toString());
			JsonObject getResult =  callWebAPI("http://10.37.36.111/AvatarWebApi/wwwroot/api/ForecastWeather",ja.toString());
			weather = gson.fromJson(getResult, OpenWeather.class);
	    	return weather;
	    }
	  
	  
	  
	  //private CloseableHttpClient httpclient = HttpClients.createDefault();
	   private JsonObject callWebAPI(String url, String body){
		  
		  	
		    CloseableHttpClient httpclient = HttpClients.createDefault();
		    
			
		    HttpPost httpPost = new HttpPost(url);
			httpPost.addHeader("Accept-Charset", "UTF-8");
			
			httpPost.setHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.getMimeType());
			
			//set request body
			StringEntity bodyEntity = new StringEntity(body, ContentType.create("application/json", "UTF-8"));
			httpPost.setEntity(bodyEntity);
			
			
			HttpResponse response=null;
			JsonObject jObj=new JsonObject();
			try {

				response = httpclient.execute(httpPost);

				if (response.getStatusLine().getStatusCode() == 200) 
				{
					
					String rs = EntityUtils.toString(response.getEntity(),StandardCharsets.UTF_8);
					
					
					JsonObject rtn = gson.fromJson(rs, JsonObject.class);
					
					if("0000000".equals(rtn.get("Result").getAsString()))
					{
						if(!rtn.get("ResponseObject").isJsonNull())
						{
							jObj = rtn.getAsJsonObject("ResponseObject");
							//ResponseObject = rtn.getAsJsonArray("ResponseObject");
						}
					}
					else
					{
						System.out.println(rtn);
						throw new Exception("callWebAPI has error !");
					}
					
				} else {
					System.out.println(response.getStatusLine().getStatusCode());
				}
			} catch (Exception e) {
			
			}

			return jObj;
		}
	   
	   @RequestMapping(value = "/test4",method=RequestMethod.GET) 
	   public void getTest4()
	   {
		   try {
			   
			Connection conn=DataSourceConfig.getInstance().getDBConnection();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (PropertyVetoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   }
		
	   
}
