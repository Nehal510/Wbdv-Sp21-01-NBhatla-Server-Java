package com.example.WbDvSp2101NbhatlaServerJava;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collection;
import java.util.Collections;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(DemoApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port","8080"));
		app.run(args);
		//SpringApplication.run(DemoApplication.class, args);
	}

}
