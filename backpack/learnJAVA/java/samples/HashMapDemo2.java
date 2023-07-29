package com.wistron.avatar.basic.samples;

import java.util.*;

public class HashMapDemo2 {
	public static void main(String[] args) {
		Map<String, String> map = new HashMap<String, String>();

		map.put("justin", "justin's message");
		map.put("momor", "momor's message");
		map.put("caterpillar", "caterpillar's message");

		Collection<String> collection = map.values();
		Iterator<String> iterator = collection.iterator();

		while (iterator.hasNext()) {
			System.out.println(iterator.next());
		}
		System.out.println();

		// Get values by key
		for (String key : map.keySet()) {
			System.out.println(map.get(key));
		}
	}
}