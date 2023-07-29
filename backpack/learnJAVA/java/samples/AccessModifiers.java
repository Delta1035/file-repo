package com.wistron.avatar.basic.samples;

import com.wistron.avatar.basic.samples.function.Addition;

public class AccessModifiers { // extends Addition: protected modifier allows
								// the access of protected members in subclasses
								// (in any packages)

	public static void main(String args[]) {
		Addition obj = new Addition();
		/*
		 * It will throw error because we are trying to access the default
		 * method in another package
		 */
		//obj.plus(10, 21);

		/*
		 * It will throw error because we are trying to access the protected
		 * method in another package
		 */
		//obj.minus(10, 21);

		/*
		 * It will process successfully to access the public method in another
		 * package
		 */
		obj.mult(10, 21);
	}
}