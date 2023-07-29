package com.wistron.avatar.basic.samples;

class ConstructorSample {
	public ConstructorSample(int a, int b) {
		System.out.print("DefaultConstructor");
		System.out.println("havingNoanyparameters");
	}

	public ConstructorSample(int a, int b, int c) {
		System.out.print("ParameterizedConstructor");
		System.out.println("havingThreeparameters");
	}

	public ConstructorSample() {
		// TODOAuto-generatedconstructorstub
	}

	public static void main(String args[]) {
		ConstructorSample pc0 = new ConstructorSample();
		ConstructorSample pc1 = new ConstructorSample(12, 12);
		ConstructorSample pc2 = new ConstructorSample(1, 2, 13);
	}
}