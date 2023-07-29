package essential2.classVsInstance;

/**
 * Function for generate neo
 *
 */
public class TheOne {
    static int generation = 0;
    int age; // 每一个实例独有的属性
    // 静态初始化区块 当类被加载时 只执行一次
//    static { // 一般不在这里初始化变量, 可以直接在声明的时候初始化
////        generation = 0;
//    }
    // 实例初始化区域, 每次new 新的实例时 都会在 constructor之前执行一次
    {
        /*
        1. 每次new 都会执行这里一次, 所以neo 的generation 会增加
        2. age 会置0
         */
        age = 0;
        generation = generation + 1;
    }

    // 类似constructor, 实例化时执行初始化动作
    public TheOne() {
        age = age + 1;

    }

    public static void main(String[] args){
        TheOne neo = new TheOne();
        neo.age = 80;
        System.out.println("generation "+generation+" neo died at age"+neo.age);
        TheOne neo2 = new TheOne();
        neo2.age = 75;
        System.out.println("generation 生成"+generation+" neo died at age"+neo2.age);
        TheOne neo3 = new TheOne();
        neo3.age = 44;
        System.out.println("generation "+generation+" neo died at age"+neo3.age);
        DirectlyAccessTester i = new DirectlyAccessTester();
        System.out.println(i.instanceVariable + "这是其他类的书局");
    }
}
