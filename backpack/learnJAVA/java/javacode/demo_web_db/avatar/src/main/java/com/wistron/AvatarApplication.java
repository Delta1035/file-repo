package com.wistron;

import com.wistron.common.util.Compare;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AvatarApplication {

    public static void main(String[] args) {
        SpringApplication.run(AvatarApplication.class, args);
        int a = 1;
        int b = 2;
        System.out.println(Compare.compare(a,b));
    }

}
