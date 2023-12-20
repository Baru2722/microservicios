package com.BallenaRuiz.colegio.docente.converter;

import org.springframework.stereotype.Component;

import com.BallenaRuiz.colegio.docente.dto.DocenteDTO;
import com.BallenaRuiz.colegio.docente.entity.Docente;

@Component
public class DocenteConverter extends AbstractConverter<Docente,DocenteDTO>{

	//Convertir a un DTo
	@Override
	public DocenteDTO fromEntity(Docente entity) {
		if(entity==null) return null;
		return DocenteDTO.builder() //construirlo
				.id(entity.getId())
				.nombre(entity.getNombre())
				.apellidopaterno(entity.getApellidopaterno())
				.apellidomaterno(entity.getApellidomaterno())
				.tipodocumento(entity.getTipodocumento())
				.numerodocumento(entity.getNumerodocumento())
				.sexo(entity.getSexo())
				.fechanacimiento(entity.getFechanacimiento())
				.correo(entity.getCorreo())
				.telefono(entity.getTelefono())
				.build();
	}

	@Override
	public Docente fromDTO(DocenteDTO dto) {
		if(dto==null) return null;
		return Docente.builder() //construirlo
				.id(dto.getId())
				.nombre(dto.getNombre())
				.apellidopaterno(dto.getApellidopaterno())
				.apellidomaterno(dto.getApellidomaterno())
				.tipodocumento(dto.getTipodocumento())
				.numerodocumento(dto.getNumerodocumento())
				.sexo(dto.getSexo())
				.fechanacimiento(dto.getFechanacimiento())
				.correo(dto.getCorreo())
				.telefono(dto.getTelefono())
				.build();
	}

}
