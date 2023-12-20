package com.BallenaRuiz.colegio.docente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BallenaRuiz.colegio.docente.entity.Docente;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Integer> {
	List<Docente> findByNombreContaining(String nombre, org.springframework.data.domain.Pageable page); // Metodo para buscar por el nombre
	Docente findByNombre(String nombre);
	List<Docente> findByUsuarioId(int usuarioId);
}
