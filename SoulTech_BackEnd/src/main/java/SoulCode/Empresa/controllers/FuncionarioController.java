package SoulCode.Empresa.controllers;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import SoulCode.Empresa.models.Funcionario;

import SoulCode.Empresa.services.FuncionarioService;


@CrossOrigin 
@RestController 
@RequestMapping("empresa") 
public class FuncionarioController {
//	@Autowired
//	private FuncionarioRepository funcionarioRepository;
	@Autowired
	private FuncionarioService funcionarioService;
	
	
	@GetMapping("/funcionario") 
	public List<Funcionario> mostrarTodosFuncionarios() {
		List<Funcionario> funcionario = funcionarioService.mostrarTodosFuncionarios();
		return funcionario;
	}
	@GetMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<?> buscarUmFuncionario(@PathVariable Integer id_funcionario) {
	 Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcionario);
		return ResponseEntity.ok().body(funcionario);
	}
	
	@PostMapping("/funcionario")
	public ResponseEntity<Void> InserirFuncionario(@RequestBody Funcionario funcionario) {
		funcionario = funcionarioService.InserirFuncionario(funcionario);
				URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(funcionario.getId_funcionario())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	@DeleteMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void>deletarUmFuncionario(@PathVariable Integer id_funcionario){
		funcionarioService.deletarUmFuncionario(id_funcionario);
				return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void> editarFuncionario(@PathVariable Integer id_funcionario, @RequestBody Funcionario funcionario){
		funcionario.setId_funcionario(id_funcionario);
		funcionario = funcionarioService.editarFuncionario(funcionario);
		return ResponseEntity.noContent().build();
	}
	
}