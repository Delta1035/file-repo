package com.wistron.avatar.kafka.basic;

import java.util.Properties;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.log4j.Logger;

public class BasicProducer {
	private static Logger log = Logger.getLogger(BasicProducer.class);

//	public static void main(String[] args) throws Exception {
//		/*	Kafka Topic	*/
//		String topic = "testconn";
//		/*	Kafka Record Key	*/
//		String key = "10409117";
//		/*	Kafka Record Value	*/
//		String message = "{\"username\":\"Chiayi Wu\",\"userid\":\"10409117\",\"message\":\"My First Produce Data\"}";
//
//		Properties props = new Properties();
//		/*	Kafka Server IP & Port	*/
//		props.put("bootstrap.servers", "10.37.35.36:9092,10.37.35.37:9092,10.37.35.38:9092");
//		/*	How to serialize key/value pairs	*/
//		props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
//		props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
//		/*	Get Metadata timeout, default:60000	*/
//		props.put("metadata.fetch.timeout.ms", 10000);
//		/*	The maximum amount of data per-partition the server will return		*/
//		props.put("max.request.size", 20971520); 
//		/*	The number of acknowledgments the producer requires the leader to have received before considering a request complete. 	*/
//		props.put("acks", "all");
//		/*	Setting a value greater than zero will cause the client to resend any record whose send fails with a potentially transient error.	*/
//		props.put("retries", Integer.MAX_VALUE + "");
//		/*	the minimum number of copies of the data that you are willing to have online at any time to continue running and accepting new incoming messages	*/
//		props.put("min.insync.replicas", 3);
//		
//		KafkaProducer<String, String> producer = new KafkaProducer<String, String>(props);
//		try {
//			ProducerRecord<String, String> record = null;
//			record = new ProducerRecord<String, String>(topic, key, message);
//			RecordMetadata m = producer.send(record).get();
//			if (m != null) {
//				log.info("Produce Data To Kafka successfully!! + partition: " + m.partition()+";offset: " + m.offset());
//			}else {
//				log.error("Produce Data To Kafka error!!!");
//			}
//		}catch(Exception e) {
//			log.error("Producer error: ",e);
//			throw e;
//		}finally {
//			producer.close();
//		}
//	}

}
