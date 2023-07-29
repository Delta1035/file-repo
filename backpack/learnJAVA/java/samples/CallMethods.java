package com.wistron.avatar.basic.samples;

public class CallMethods {
	public static void main(String argu[]) {
		int val1 = 62;
		int val2 = 8;
		int res = plus(val1, val2);
		System.out.println("Result is: " + res);
	}

	public static int plus(int g1, int g2) {
		int ans;
		ans = g1 + g2;
		return ans;
	}
}