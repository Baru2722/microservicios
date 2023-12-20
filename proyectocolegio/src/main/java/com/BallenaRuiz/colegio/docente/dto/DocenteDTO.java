package com.BallenaRuiz.colegio.docente.dto;
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
public class DocenteDTO {
	private int id;
	private String nombre;
	private String apellidopaterno;
	private String apellidomaterno;
	private String tipodocumento;
	private String numerodocumento;
	private String sexo;
	private String fechanacimiento;
	private String correo;
	private String telefono;
	private int usuarioId;

}
