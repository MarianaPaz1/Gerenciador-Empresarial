import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/Models/cargoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.css']
})
export class CadastroCargoComponent implements OnInit {

  cargo:Cargo = {
    ca_nome: '',
    car_atribuicao:''
  }
  constructor(private cargoService:CargoService,private router:Router) { }

  ngOnInit(): void {
  }

// método criado para cadastrar cargo.
  cadastrarCargo(): void{
    this.cargoService.cadastrarCargo(this.cargo).subscribe((resultado)=>{
     this.cargoService.mensagem(" O cargo foi cadastrado com sucesso.")
      this.router.navigate(['/cargo'])

    })

  }
//método criado que substitui o routerLink na página, tem a funcionalidade de voltar para a rota quando acionado.
  cancelarCadastro(){
    this.router.navigate(['/cargo'])
  }
}
