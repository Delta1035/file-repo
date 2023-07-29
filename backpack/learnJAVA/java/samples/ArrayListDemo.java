package com.wistron.avatar.basic.samples;

import java.util.*;

public class ArrayListDemo {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		List<String> list = new ArrayList<String>();

		System.out.println("Input name: ");

		while (true) {
			System.out.print("# ");
			String input = scanner.next();
			if (input.equals("quit"))
				break;
			list.add(input);
		}

		System.out.print("Display: ");
		for (String s : list) {
			System.out.print(s + " ");
		}

		System.out.println();
	}
}