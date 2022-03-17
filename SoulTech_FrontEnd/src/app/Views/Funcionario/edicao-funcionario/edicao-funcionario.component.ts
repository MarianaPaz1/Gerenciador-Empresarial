import { CargoService } from 'src/app/services/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Models/funcModel';

@Component({
  selector: 'app-edicao-funcionario',
  templateUrl: './edicao-funcionario.component.html',
  styleUrls: ['./edicao-funcionario.component.css']
})
export class EdicaoFuncionarioComponent implements OnInit {
id_cargo: any
funcionario: Funcionario={
  id_funcionario: '',
  func_cidade: '',
  func_nome:'',
  id_cargo: '',
  func_cpf: '',
    func_foto: ''
}

  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router:Router, private cargoService: CargoService) { }

  ngOnInit(): void {
    this.funcionario.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    // this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
    this.buscarUmFuncionario();
  }
  buscarUmFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.funcionario.id_funcionario).subscribe((resultado)=>{
      this.funcionario = resultado;
    })
  }
//professora com bug
//   editarFuncionario(){
//     this.funcionarioService.editarFuncionario(this.funcionario, this.funcionario.id_funcionario).subscribe({
//     complete: () => {  this.cargoService.mensagem("Funcionário editado com sucesso"),
//    this.router.navigate([`/listaGeralFuncionarios`])},
//     error: () => {  this.cargoService.mensagem("Erro! O funcionário não foi editado"),
//   this.router.navigate([`/listaGeralFuncionarios`])},
//  })
// }

//Antigo edite sem bug
editarFuncionario() {
  if (this.id_cargo != 0) {
    this.funcionarioService.editarFunc(this.funcionario, this.funcionario.id_funcionario, this.id_cargo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Funcionário editado com sucesso!")
        this.router.navigate([`/listaGeralFuncionarios`])
      },
      error: () => {
        this.cargoService.mensagem("Erro ao editar funcionário.")
        this.router.navigate([`/listaGeralFuncionarios`])
      },
      next: () => console.log("Funcionário editado.")
    })
  } else {
    this.funcionarioService.editarFuncSemCargo(this.funcionario, this.funcionario.id_funcionario).subscribe({
      complete: () => {
        this.cargoService.mensagem("Funcionário editado com sucesso!"),
        this.router.navigate([`/listaGeralFuncionarios`])
      },
      error: () => {
        this.cargoService.mensagem("Erro ao editar funcionário.")
        this.router.navigate([`/listaGeralFuncionarios`])
      },
      next: () => console.log("Funcionário editado.")
    })
  }
}
cancelarEdicao(){
  this.router.navigate(['/listaGeralFuncionarios'])
}

// trocarCargo(){
//   this.id_cargo = prompt("Para qual cargo esse funcionário será remanejado?", "id_cargo")
//   this.funcionarioService.editarFuncionario(this.funcionario, this.funcionario.id_funcionario, this.id_cargo).subscribe({
//     complete: () => { alert("Funcionário transferido com sucesso"),
//     this.router.navigate([`funcionarioCargo/${this.id_cargo}`])},
//     error: () => { alert("Erro! O Funcionário não poderá ser remanejado")}
// //      this.router.navigate([`alunoTurma/${this.id_turma}`])},

// })

}

