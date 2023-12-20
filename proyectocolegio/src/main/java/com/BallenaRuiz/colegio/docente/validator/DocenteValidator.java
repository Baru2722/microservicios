package com.BallenaRuiz.colegio.docente.validator;

import com.BallenaRuiz.colegio.docente.entity.Docente;
import com.BallenaRuiz.colegio.docente.exceptions.ValidateServiceException;

public class DocenteValidator {
	public static void save(Docente docente) {
        if (docente.getNombre() == null || docente.getNombre().isEmpty()) {
            throw new ValidateServiceException("El nombre es requerido");
        }
        if (docente.getNombre().length()>100) {
        	throw new ValidateServiceException("El nombre es muy largo");
        }
        if (docente.getApellidopaterno().length()>100) {
        	throw new ValidateServiceException("El Apellido Paterno es muy largo");
        }
        if (docente.getApellidomaterno().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
        if (docente.getTipodocumento().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
        if (docente.getNumerodocumento().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
        if (docente.getSexo().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
        if (docente.getFechanacimiento().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
        if (docente.getCorreo().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
        if (docente.getTelefono().length()>100) {
        	throw new ValidateServiceException("El Apellido Materno es muy largo");
        }
    }
}