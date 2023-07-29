package com.wistron.avatar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class App {

	@GetMapping(path="/")
	public String home() {
		return "1";
	}

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}
