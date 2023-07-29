package com.wistron.avatar.kafka.basic;

import java.util.Arrays;
import java.util.Properties;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.log4j.Logger;

public class BasicConsumer {
	private static Logger log = Logger.getLogger(BasicConsumer.class);

//	public static void main(String[] args) throws Exception {
//		/*	Kafka Topic	*/
//		String topic = "testconn";
//
//		Properties props = new Properties();
//		/*	Kafka Server IP & Port	*/
//		props.put("bootstrap.servers","10.37.35.36:9092,10.37.35.37:9092,10.37.35.38:9092");
//		/*  Kafka Consumer group	*/
//		props.put("group.id", "testconn");
//		props.put("client.id", "testconn" +"_clientId");
//		/*  Read data from beginning	*/
//		props.put("auto.offset.reset", "earliest");
//		/*	How to serialize key/value pairs	*/
//		props.put("key.deserializer", StringDeserializer.class.getName());
//		props.put("value.deserializer", StringDeserializer.class.getName());
//		/*  able auto commit offset to Kafka		*/
//		props.put("enable.auto.commit", "true");
//		/*	The maximum amount of data per-partition the server will return		*/
//		props.put("max.partition.fetch.bytes", "20971520");//20 MB
//
//		KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(props);
//		consumer.subscribe(Arrays.asList(topic));
//		try {
//			ConsumerRecords<String, String> records = consumer.poll(1000);
//			//get current poll assignment
//			for(ConsumerRecord<String,String> m :  records ){
//				try {
//					// print kafka data
//					log.info(m.topic()+m.partition()+m.offset()+m.key());
//					log.info("Data: "+m.value());
//				} catch (Exception e) {
//					log.error("consume error: ",e);
//					throw e;
//				}
//			}
//		} catch (WakeupException e) {
//			/* ignore for shutdown	*/
//			log.error("!!!!WakeupException", e);
//			throw e;
//		} catch(Exception e){
//			log.error("Kafka Consumer error: ", e);
//			throw e;
//		} finally {
//			consumer.close();
//		}
//	}
}
