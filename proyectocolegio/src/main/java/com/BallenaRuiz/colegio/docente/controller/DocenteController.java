package com.BallenaRuiz.colegio.docente.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BallenaRuiz.colegio.docente.converter.DocenteConverter;
import com.BallenaRuiz.colegio.docente.dto.DocenteDTO;
import com.BallenaRuiz.colegio.docente.entity.Docente;
import com.BallenaRuiz.colegio.docente.service.DocenteService;
import com.BallenaRuiz.colegio.docente.utils.WrapperResponse;


@RestController
@RequestMapping("/api/docente")
public class DocenteController {
	
	@Autowired
	private DocenteService service;
	
	@Autowired 
	private DocenteConverter converter;
	
		@GetMapping() 
		public ResponseEntity<List<Docente>> getAll(){
			List<Docente> docente= service.findAll();
			return ResponseEntity.status(HttpStatus.OK).body(docente);
		}
	//Metodos 
	@GetMapping("/api")
	public ResponseEntity<List<DocenteDTO>> findAll( // el Metodo findAll va a devolver los DTO
			//Parametros
			@RequestParam (value = "nombre",required = false, defaultValue ="") String nombre,
			@RequestParam (value = "offset",required = false, defaultValue ="0") int pageNumbre,
			@RequestParam (value = "limit",required = false, defaultValue ="5") int pageSize
			){
		Pageable page= PageRequest.of(pageNumbre,pageSize);
		List<Docente> docentes;
		if(nombre.isEmpty()) {
			docentes=service.findAll(page);	
		}else {
			docentes=service.finByNombre(nombre, page);
		}
		
		List<DocenteDTO> docentesDTO=converter.fromEntity(docentes); //convirte una lista de entidades a una lista de DTO
		return new WrapperResponse(true,"success",docentesDTO).createResponse(HttpStatus.OK); // Devuelve la lista
	}
	
	
	@GetMapping(value="/{id}") //Notaciòn
	public ResponseEntity<WrapperResponse<DocenteDTO>> findById(@PathVariable("id")int id){
		Docente docente = service.findById(id);
		DocenteDTO docenteDTO=converter.fromEntity(docente); // se envia una entidad y lo convierte a un DTO
		return new WrapperResponse<DocenteDTO>(true,"success",docenteDTO).createResponse(HttpStatus.OK); //retorna un DTO
	}
	
	@PostMapping()
	public ResponseEntity<DocenteDTO> create(@RequestBody DocenteDTO docenteDTO){ //esperando un articulo DTO
		Docente registro=service.save(converter.fromDTO(docenteDTO)); // convertir de un DTO a una entidad
		DocenteDTO registroDTO=converter.fromEntity(registro);
		return new WrapperResponse(true,"success",registroDTO).createResponse(HttpStatus.CREATED); //devolver el registro DTO
	}
	
	/*@GetMapping(value="/usuario/{usuarioId}")
	public ResponseEntity<WrapperResponse<DocenteDTO>> listarDocentePorUsuarioId(@PathVariable("usuarioId")int id){
		List<Docente> docente = service.byUsuarioId(id);
		DocenteDTO docenteDTO=converter.fromEntity(docente); // se envia una entidad y lo convierte a un DTO
		return new WrapperResponse<DocenteDTO>(true,"success",docenteDTO).createResponse(HttpStatus.OK); //retorna un DTO
	}*/
	
	@PutMapping(value="/{id}")
	public ResponseEntity<DocenteDTO> update(@PathVariable("id")int id,@RequestBody DocenteDTO docenteDTO){
		Docente registro = service.update(converter.fromDTO(docenteDTO));
		DocenteDTO registroDTO=converter.fromEntity(registro); // se envia una entidad y lo convierte a un DTO
		return new WrapperResponse(true,"success",registro).createResponse(HttpStatus.OK);
	}
	
	@DeleteMapping(value ="/{id}")
	public ResponseEntity<DocenteDTO> delete(@PathVariable("id")int id){
		service.delete(id);
		return new WrapperResponse(true,"success",null).createResponse(HttpStatus.OK);
	}
}