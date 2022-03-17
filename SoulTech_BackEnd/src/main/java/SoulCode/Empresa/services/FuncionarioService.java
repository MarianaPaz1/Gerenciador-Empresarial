package SoulCode.Empresa.services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SoulCode.Empresa.models.Funcionario;
import SoulCode.Empresa.repositories.FuncionarioRepository;


@Service
public class FuncionarioService {
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	public List<Funcionario> mostrarTodosFuncionarios() {
		return funcionarioRepository.findAll();
	}
	
	public Funcionario buscarUmFuncionario(Integer id_funcionario) {
		Optional<Funcionario> funcionario = funcionarioRepository.findById(id_funcionario);
		return funcionario.orElseThrow();
	}

	public Funcionario InserirFuncionario(Funcionario funcionario) {
		return funcionarioRepository.save(funcionario);
	}
	
	public void deletarUmFuncionario(Integer	id_funcionario) {
	funcionarioRepository.deleteById(id_funcionario);
	}
	
	public Funcionario editarFuncionario(Funcionario funcionario) {
		buscarUmFuncionario(funcionario.getId_funcionario());
		return funcionarioRepository.save(funcionario);
	}
}
