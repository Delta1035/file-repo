package com.wistron.avatar.sharerate;

import com.wistron.avatar.sharerate.common.util.LogstashUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ShareRateApplication {

    @GetMapping(path="/")
    public String home() {
        LogstashUtil.logstash.info("logstash test info");
        return "1";
    }

	public static void main(String[] args) {
		SpringApplication.run(ShareRateApplication.class, args);
	}

}
