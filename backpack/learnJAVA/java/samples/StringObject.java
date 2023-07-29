package com.wistron.avatar.basic.samples;

public class StringObject {

	public static void main(String args[]) {
		// Declaration
		char[] nameArray = { 'A', 'l', 'e', 'x' };
		String name1 = new String(nameArray);

		// Declaration in more commonly used
		String name2 = "Alex";

		// Concate String
		String message = "Hello," + " world" + "!";

		// Change string case
		String str1 = "Hello";
		System.out.println(str1.toUpperCase());
		System.out.println(str1.toLowerCase());

		// Trim
		String str2 = " Hello ";
		System.out.println(str2.trim());

		// String Length
		String str3 = "Cloud";
		System.out.println(str3.length());

		// String equals
		// These two have the same value
		if (new String("test").equals("test")) {
			System.out.println(true);
		}

		// ... but they are not the same object
		if (new String("test") == "test") {
			System.out.println(true);
		}

		// ... neither are these
		if (new String("test") == new String("test")) {
			System.out.println(true);
		}

		// ... but these are because literals are interned by
		// the compiler and thus refer to the same object
		if ("test" == "test") {
			System.out.println(true);
		}
	}
}