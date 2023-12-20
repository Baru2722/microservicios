package com.BallenaRuiz.colegio.docente.entity;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name="docente")
public class Docente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true,nullable = false, length = 100) 
	private String nombre;
	
	@Column(name="apellidopaterno",nullable = false,length = 100)
	private String apellidopaterno;
	@Column(name="apellidomaterno",nullable = false,length = 100)
	private String apellidomaterno;
	
	@Column(name="tipodocumento",nullable = false,length = 100)
	private String tipodocumento;
	@Column(name="numerodocumento",nullable = false,length = 100)
	private String numerodocumento;
	@Column(name="sexo",nullable = false,length = 20)
	private String sexo;
	@Column(name="fechanacimiento",nullable = false,length = 100)
	private String fechanacimiento;
	@Column(name="correo",nullable = false,length = 100)
	private String correo;
	@Column(name="telefono",nullable = false,length = 100)
	private String telefono;
	
    private  int usuarioId; 
	
	@Column(name="created_at",nullable = false,updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;
	@Column(name="updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;
	@Column(name="activo",nullable=false)
	private boolean activo;
}
