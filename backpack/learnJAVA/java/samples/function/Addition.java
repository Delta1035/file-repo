package com.wistron.avatar.basic.samples.function;

public class Addition {
	// access modifier: private
	private double num = 100;

	/*
	 * Since we didn't mention any access modifier here, it would be considered
	 * as default.
	 */
	int plus(int a, int b) {
		return a + b;
	}

	// access modifier: protected
	protected int minus(int a, int b) {
		return a - b;
	}

	// access modifier: public
	public int mult(int a, int b) {
		return a - b;
	}

}