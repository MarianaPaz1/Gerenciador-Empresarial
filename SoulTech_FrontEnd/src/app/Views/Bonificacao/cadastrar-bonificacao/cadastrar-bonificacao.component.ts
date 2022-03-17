import { CargoService } from 'src/app/services/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BonificacaoService } from './../../../services/bonificacao.service';
import { Bonificacao } from './../../../Models/bonificacaoModel';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'

@Component({
  selector: 'app-cadastrar-bonificacao',
  templateUrl: './cadastrar-bonificacao.component.html',
  styleUrls: ['./cadastrar-bonificacao.component.css']
})
export class CadastrarBonificacaoComponent implements OnInit {
  id_mentor: any

  bonificacao: Bonificacao ={
  codigo: '',
  bonificacao_descricao: '',
  bonificacao_data: '',
  bonificacao_status: 'PENDENTE',
  bonificacao_valor: 0,

}


  constructor(private location:Location, private cargoService:CargoService, private bonificacaoService: BonificacaoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
  }
  cadastrarBonificacao(){
    this.bonificacaoService.CadastrarBonificacao(this.bonificacao, this.id_mentor).subscribe({
      complete: () => {this.cargoService.mensagem("Bonificação cadastrada com sucesso."), this.location.back()},
      error:   ()=> {this.cargoService.mensagem("A Bonificação não foi cadastrada"), this.location.back()}
    })

  }

}
