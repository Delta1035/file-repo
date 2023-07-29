package com.wistron.avatar;

import com.wistron.avatar.common.util.mailserviceutil.SpringMailUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;

@Component
@Order(value = 1)
@Slf4j
public class PreConfig implements CommandLineRunner {

    @Autowired
    JavaMailSender javaMailSender;

    @Value("${spring.profiles.active}")
    String active;

    @Override
    public void run(String... args) {
        SpringMailUtil.setMailSender(this.javaMailSender);
    }

    @PreDestroy
    public void destroy() {
        SpringMailUtil.cleanMailSender();
    }

}
