package com.wistron.avatar.basic.samples;

import java.util.*;

public class IteratorDemo {
	public static void main(String[] args) {
		@SuppressWarnings("resource")
		Scanner scanner = new Scanner(System.in);

		List<String> list = new ArrayList<String>();

		System.out.println("input name: ");
		while (true) {
			System.out.print("# ");
			String input = scanner.next();

			if (input.equals("quit"))
				break;
			list.add(input);
		}

		// Iterator List
		Iterator<String> iterator = list.iterator();
		while (iterator.hasNext()) {
			System.out.print(iterator.next() + " ");
		}

		System.out.println();
	}
}