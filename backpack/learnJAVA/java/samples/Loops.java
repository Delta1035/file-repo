package com.wistron.avatar.basic.samples;

public class Loops {

	public static void main(String args[]) {
		// local variable Initialization 
		int n = 1, times = 5;

		// while loops execution
		while (n <= times) {
			System.out.println("Java while loops:" + n);
			n++;
		}

		// local variable Initialization
		n = 1;
		times = 0;

		// do-while loops execution
		do {
			System.out.println("Java do while loops:" + n);
			n++;
		} while (n <= times);

		// local variable Initialization
		n = 1;
		times = 5;

		// for loops execution
		for (n = 1; n <= times; n++) {
			System.out.println("Java for loops:" + n);
		}
	}
}