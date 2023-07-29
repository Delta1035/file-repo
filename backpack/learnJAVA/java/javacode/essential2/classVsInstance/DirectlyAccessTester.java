package essential2.classVsInstance;

import java.util.Arrays;

public class DirectlyAccessTester {
    int instanceVariable = 0;
    static int staticVariable = 0;
    void testInstanceMethod() {
        staticVariable = 1;
        this.instanceVariable = 2;
    }

    void testInstanceMethod2(){
        testInstanceMethod();
    }

    static void testStaticMethod(){
        staticVariable = 2;
        // instanceVariable = 1;// 静态方法不能使用实例变量
        //this.instanceVariable = 1; // 静态上下文, this不知道指向谁
       // testInstanceMethod() // 静态方法也不能使用实例方法
    }

//    public void main(String[] args){
//        System.out.println(Arrays.toString(args));
//        DirectlyAccessTester dat = new DirectlyAccessTester();
//        dat.instanceVariable = 2;
//        dat.testInstanceMethod();
//        dat.testInstanceMethod2();
//        DirectlyAccessTester.testStaticMethod();
//        DirectlyAccessTester.staticVariable = 10;
//        TheOne neo4 = new TheOne();
//        neo4.age = 100;
//    }
}