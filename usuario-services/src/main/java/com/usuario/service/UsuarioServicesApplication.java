package com.usuario.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class UsuarioServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsuarioServicesApplication.class, args);
	}

}
