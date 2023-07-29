package com.wistron.avatar.basic.samples;

public class StaticModifier {
	private int counter1 = 0;
	private static int counter2 = 0;

	public void increase(String s) {
		counter1++;
		counter2++;
		System.out.print(s + "'s counter1 = " + counter1);
		System.out.println("; counter2(static) = " + counter2);
	}

	public static void main(String argv[]) {
		StaticModifier sta1 = new StaticModifier();
		StaticModifier sta2 = new StaticModifier();

		sta1.increase("sta1"); //1 1
		sta1.increase("sta1"); //2 2
		sta2.increase("sta2"); //1 3
	}
}