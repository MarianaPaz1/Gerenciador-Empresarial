import { FuncionarioService } from '../../../services/funcionario.service';
import { CargoService } from 'src/app/services/cargo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/Models/cargoModel';
import { Funcionario } from 'src/app/Models/funcModel';




@Component({
  selector: 'app-atribuir-cargo',
  templateUrl: './atribuir-cargo.component.html',
  styleUrls: ['./atribuir-cargo.component.css']
})
export class AtribuirCargoComponent implements OnInit {

 cargos:Cargo[] = []
 cargoEscolhido: any = []
  id_cargo:any
  id_funcionario:any
  CargoDoFuncionario:any = []

  funcionario: Funcionario ={
    id_funcionario: '',
    func_cidade: '',
    func_nome: '',
    id_cargo: '',
    func_cpf: '',
    func_foto: ''
  }

  constructor(private cargoService:CargoService,
    private funcionarioService:FuncionarioService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
     this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    console.log(this.id_cargo)
    this.buscarTodosCargos()
    this.mostrarFuncionario()
    this.buscarCargo()
  }

  buscarTodosCargos(){
    this.cargoService.mostrarTodosCargos().subscribe(resultado =>{
      this.cargos = resultado
    })
  }

  mostrarCargo(){
    console.log(this.cargoEscolhido)
  }

  mostrarFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.id_funcionario).subscribe(resultado =>{
      this.funcionario = resultado
    })
  }

  buscarCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resultado =>{
      this.cargoEscolhido = resultado
      console.log(this.CargoDoFuncionario)
    })
  }

  atribuirCargo(){
    this.funcionarioService.atribuirCargo(this.cargoEscolhido,this.id_funcionario).subscribe({
      complete: () => {  this.cargoService.mensagem("Funcionario cadastrado no cargo com sucesso")
                        this.router.navigate(['/cargo'])
                      },
      error: () => {  this.cargoService.mensagem("Funcionario não cadastrado no cargo")
                        this.router.navigate(['/cargo'])
                      },
      next: () => { console.log("Funcionario cadastrado no cargo com sucesso")}

      });
  }

  deixarFuncionarioSemCargo(){
    this.funcionarioService.deixarFuncionarioSemCargo (this.funcionario,this.id_funcionario).subscribe({
      complete: () => { this.cargoService.mensagem("Funcionário sem cargo")
                        this.router.navigate(['/cargo'])
                      },
      error: () => {  this.cargoService.mensagem("Funcionario não ficou sem cargo")
                        this.router.navigate(['/cargo'])
                      },
      next: () => { console.log("Funcionário sem cargo")}

      });

  }


}
