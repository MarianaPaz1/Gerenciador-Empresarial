import { HttpClient } from '@angular/common/http';
import { Funcionario } from './../../../Models/funcModel';
import { CargoService } from 'src/app/services/cargo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {
  idFuncionarioCadastrado: any

  funcionarioCadastrado: boolean = false
  id_cargo: string = ''
  cargos: any
  cargoEscolhido: any
  foto: any

  funcionario: Funcionario ={
    id_funcionario: '',
    func_cidade: '',
    func_nome: '',
    id_cargo: '',
    func_cpf: '',
    func_foto: '',

  }


  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router: Router, private cargoService: CargoService, private http: HttpClient, private location: Location ) { }

  ngOnInit(): void {

    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
  }


// cadastrarFuncionario(){
//   this.funcionarioService.CadastrarFuncionario(this.funcionario, this.id_cargo).subscribe({
//   complete: () => {  this.cargoService.mensagem("Funcionário cadastrado com sucesso")
//                     this.router.navigate(['/listaGeralFuncionarios'])
//                   },
//   error: () => {  this.cargoService.mensagem("Funcionário não cadastrado")
//                     this.router.navigate(['/listaGeralFuncionarios'])
//                   },
//   next: () => { console.log("Funcionário cadastrado com sucesso")}

//   });

// }
// cadastrarFuncionario() {
//   this.funcionarioService.CadastrarFuncionario(this.funcionario).subscribe({
//     complete: () => {
//       this.cargoService.mensagem("Funcionário cadastrado com sucesso!")
//        this.funcionarioService.buscarFuncionarioPeloCpf(`${this.funcionario.func_cpf}`).subscribe((resultado) => {
// console.log(resultado)
//         this.idFuncionarioCadastrado = resultado.id_funcionario
//         this.funcionarioCadastrado = true
//       })
//     },
//     error: () => {
//       this.cargoService.mensagem("Não foi possível cadastrar o mentor")
//     }
//   })
// }


cadastrarFuncionario () {
  this.funcionarioService.CadastrarFuncionario(this.funcionario).subscribe({
    next: () => {

      this.funcionarioService.buscarFuncionarioPeloCpf(this.funcionario.func_cpf).subscribe(resultado => {
        console.log(resultado)
        this.idFuncionarioCadastrado = resultado.id_funcionario

                  this.funcionarioCadastrado = true
        this.cargoService.mensagem("Funcionário cadastrado com sucesso")
      })
    },
    error: () => {
      this.cargoService.mensagem("Não foi possível cadastrar o funcionário")
    }
  })
}

subirFoto(event: any) {

  if (event.target.files && event.target.files[0]) {
    this.foto = event.target.files[0]
    console.log(this.foto)

    const formData = new FormData

    formData.append("foto", this.foto)

    const nome: string = this.funcionario.func_nome + "-" + event.target.files[0].name

    this.http.post(`http://localhost:8080/empresa/envia/${this.idFuncionarioCadastrado}?nomeDoArquivo=${nome}`, formData).subscribe({
      complete: () => {
        console.log("Foto enviado com sucesso")
      }
    })
    this.cargoService.mensagem("Foto anexada ao mentor")
    this.location.back();
  }
}


cancelarCadastro(){
  this.router.navigate([`/cargo`])
}

mostrarCargosParaAtribuicao(){
  this.cargoService.mostrarTodosCargos().subscribe(resultado =>{
    this.cargos = resultado
  })
}

escolherTurma(){
  console.log(this.cargoEscolhido)
}


}
