package com.BallenaRuiz.colegio.docente.service;
import java.util.List;
import org.springframework.data.domain.Pageable;

import com.BallenaRuiz.colegio.docente.entity.Docente;

public interface DocenteService {
	//Metodos
	    public List<Docente> findAll();
		public List<Docente> findAll(Pageable page);
		public List<Docente> finByNombre(String nombre,Pageable page ); //Busqueda
		public Docente findById (int id);
		public Docente save (Docente docente);
		public Docente update (Docente docente);
		public void delete (int id);
		List<Docente> byUsuarioId(int usuarioId);
}
