package com.wistron.avatar.basic.samples;

import com.wistron.avatar.basic.samples.data.Foo;

public class CallByValues {
	public static void main(String[] args) {
		int i = 10;
		changeValue(i); // It won't change the integer!

		Foo f = new Foo("f");
		changeReference(f); // It won't change the object!
		modifyReference(f); // It will modify the object!
	}

	public static void changeValue(int j) {
		j = 100;
	}

	public static void changeReference(Foo a) {
		Foo b = new Foo("b");
		a = b;
	}

	public static void modifyReference(Foo c) {
		c.setAttribute("c");
	}
}