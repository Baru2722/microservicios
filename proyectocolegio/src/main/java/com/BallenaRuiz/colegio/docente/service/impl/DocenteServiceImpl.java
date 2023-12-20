package com.BallenaRuiz.colegio.docente.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.BallenaRuiz.colegio.docente.entity.Docente;
import com.BallenaRuiz.colegio.docente.exceptions.GeneralServiceException;
import com.BallenaRuiz.colegio.docente.exceptions.NoDataFoundException;
import com.BallenaRuiz.colegio.docente.exceptions.ValidateServiceException;
import com.BallenaRuiz.colegio.docente.repository.DocenteRepository;
import com.BallenaRuiz.colegio.docente.service.DocenteService;
import com.BallenaRuiz.colegio.docente.validator.DocenteValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DocenteServiceImpl implements DocenteService {
	@Autowired
	private DocenteRepository repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Docente> findAll() {
		try {
			return repository.findAll();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	@Transactional(readOnly=true) // Metodo de solo lectura 
	public List<Docente> findAll(Pageable page) {
		try {
			return repository.findAll(page).toList();
		} catch (NoDataFoundException e) {
			log.info(e.getMessage(),e); //Mostrar
			throw e;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new GeneralServiceException(e.getMessage(),e);
		}
	}

	@Override
	@Transactional(readOnly=true)
	public List<Docente> finByNombre(String nombre, Pageable page) {
		try {
			return repository.findByNombreContaining(nombre,page);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(),e); //Mostrar
			throw e;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new GeneralServiceException(e.getMessage(),e);
		}
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<Docente> byUsuarioId(int usuarioId) {
		return repository.findByUsuarioId(usuarioId);
		
	}

	@Override
	@Transactional(readOnly=true)
	public Docente findById(int id) {
		try {
			Docente registro=repository.findById(id).orElseThrow(()->new NoDataFoundException("No existe el registro con ese ID"));
			return registro;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(),e); //Mostrar
			throw e;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new GeneralServiceException(e.getMessage(),e);
		}
	}

	@Override
	@Transactional
	public Docente save(Docente docente) {
		try {
			DocenteValidator.save(docente);
			if(repository.findByNombre(docente.getNombre())!=null) {
				throw new ValidateServiceException("Ya existe un registro con el nombre"+docente.getNombre());
			}
			docente.setActivo(true);
			Docente registro=repository.save(docente);
			return registro;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(),e); //Mostrar
			throw e;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new GeneralServiceException(e.getMessage(),e);
		}
	}
	
	@Override
	@Transactional
	public Docente update(Docente docente) {
		try {
			DocenteValidator.save(docente);
			Docente registro=repository.findById(docente.getId()).orElseThrow(()->new NoDataFoundException("No existe el registro con ese ID"));
			Docente registroD = repository.findByNombre(docente.getNombre());
			if(registroD!=null && registroD.getId()!=docente.getId()) {
				throw new ValidateServiceException("Ya existe un registro con el nombre"+docente.getNombre());
			}
			registro.setNombre(docente.getNombre());
			registro.setApellidopaterno(docente.getApellidopaterno());
			registro.setApellidomaterno(docente.getApellidomaterno());
			registro.setTipodocumento(docente.getTipodocumento());
			registro.setNumerodocumento(docente.getNumerodocumento());
			registro.setSexo(docente.getSexo());			
			registro.setFechanacimiento(docente.getFechanacimiento());
			registro.setCorreo(docente.getCorreo());
			registro.setTelefono(docente.getTelefono());

			repository.save(registro);
			return registro;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(),e); //Mostrar
			throw e;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new GeneralServiceException(e.getMessage(),e);
		}
		
	}


	@Override
	@Transactional
	public void delete(int id) {
		try {
			Docente registro=repository.findById(id).orElseThrow(()->new NoDataFoundException("No existe el registro con ese ID"));
			repository.delete(registro);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(),e); //Mostrar
			throw e;
		}catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new GeneralServiceException(e.getMessage(),e);
		}
		
	}
	
}
	