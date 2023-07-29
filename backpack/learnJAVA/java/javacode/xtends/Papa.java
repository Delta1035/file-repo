package com.example.demo.xtends;
import com.example.demo.xtends.GrandPapa;
public class Papa extends GrandPapa{
    public static void main(){
    System.out.println(familyInstructions);// 可以直接用父类的静态方法(要区分修饰符)
        Papa papa = new Papa();
        System.out.println(papa.name);
        papa.makeLiving();
    }
}
