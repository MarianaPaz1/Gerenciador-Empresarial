package SoulCode.Empresa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import SoulCode.Empresa.models.Funcionario;

public interface FuncionarioRepository extends JpaRepository <Funcionario,Integer> {

}
