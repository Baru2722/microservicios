package com.BallenaRuiz.colegio.docente.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WrapperResponse<T> {
	private boolean ok;
	private String message; //devolver un mensaje personalizado
	private T body; //devolver la respuesta lista
	
	public ResponseEntity<WrapperResponse<T>> createResponse(){  //crear la respuesta
		return new ResponseEntity<>(this,HttpStatus.OK);
	}
	public ResponseEntity<WrapperResponse<T>> createResponse(HttpStatus status){
		return new ResponseEntity<>(this,status);
	}
}
