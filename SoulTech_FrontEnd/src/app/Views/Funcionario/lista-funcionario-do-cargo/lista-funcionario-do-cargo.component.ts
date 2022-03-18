import { CargoService } from 'src/app/services/cargo.service';
import { Funcionario } from 'src/app/Models/funcModel';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/Models/cargoModel';


@Component({
  selector: 'app-lista-funcionario-do-cargo',
  templateUrl: './lista-funcionario-do-cargo.component.html',
  styleUrls: ['./lista-funcionario-do-cargo.component.css']
})
export class ListaFuncionarioDoCargoComponent implements OnInit {
  id_cargo: any

  funcionarios:Funcionario[] =[]

  cargo:Cargo = {
    ca_nome: '',
    car_atribuicao: ''
  }
  constructor(private funcionarioService:FuncionarioService,
    private route:ActivatedRoute,
    private router:Router, private cargoService: CargoService) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarFuncionarioDoCargo()
    this.mostrarUmCargo()


  }

  // Método criado para buscar funcionário com o cargo pelo id.
  mostrarFuncionarioDoCargo(){
    this.funcionarioService.buscarFuncionarioCargo(this.id_cargo).subscribe(resultado =>{
      this.funcionarios = resultado
      console.log(this.funcionarios)
    })
  }

  // Método criado para buscar um cargo pelo id.
    mostrarUmCargo(){
      this.cargoService.mostrarUmCargo(this.id_cargo).subscribe((resultado)=> {
        this.cargo = resultado
        console.log(this.cargo)
      })

  }





}
