package com.wistron.avatar.basic.samples;

class DataTypes {
	public static void main(String args[]) {
		byte byteVar = 5;
		short shortVar = 20;
		int intVar = 30;
		long longVar = 60;
		float floatVar = 20;
		double doubleVar = 20.123;
		boolean booleanVar = true;
		char charVar = 'W';
		//int[] ages = new int[5]; // 5 is the size of array.
		int[] ages = {22,25,30,32,35};

		System.out.println("Value Of byte Variable is " + byteVar);
		System.out.println("Value Of short Variable is " + shortVar);
		System.out.println("Value Of int Variable is " + intVar);
		System.out.println("Value Of long Variable is " + longVar);
		System.out.println("Value Of float Variable is " + floatVar);
		System.out.println("Value Of double Variable is " + doubleVar);
		System.out.println("Value Of boolean Variable is " + booleanVar);
		System.out.println("Value Of char Variable is " + charVar);

		for (int age : ages) {
			System.out.println("value Of array iterator is " + age);
		}
	}
}