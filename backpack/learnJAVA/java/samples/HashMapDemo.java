package com.wistron.avatar.basic.samples;

import java.util.*;

public class HashMapDemo {
	public static void main(String[] args) {
		Map<String, String> map = new HashMap<String, String>();
		String key1 = "caterpillar";
		String key2 = "justin";

		map.put(key1, "caterpillar's message");
		map.put(key2, "justin's message");

		System.out.println(map.get(key1));
		System.out.println(map.get(key2));
	}
}