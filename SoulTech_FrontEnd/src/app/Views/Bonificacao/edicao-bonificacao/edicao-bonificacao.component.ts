import { Bonificacao } from './../../../Models/bonificacaoModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-bonificacao',
  templateUrl: './edicao-bonificacao.component.html',
  styleUrls: ['./edicao-bonificacao.component.css']
})
export class EdicaoBonificacaoComponent implements OnInit {
codigo:any
id_mentor:any

bonificacao:Bonificacao={
  codigo: '',
  bonificacao_descricao: '',
  bonificacao_data: '',
  bonificacao_status: '',
  bonificacao_valor: 0,

}
  constructor(private bonificacaoService: BonificacaoService, private route: ActivatedRoute, private router: Router,  private location:Location) { }


ngOnInit(): void {

  this.codigo = this.route.snapshot.paramMap.get('codigo')
  this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
  this.buscarBonificacao()
}

buscarBonificacao(){
  this.bonificacaoService.buscarUmaBonificacao(this.codigo).subscribe(resultado =>{
    this.bonificacao = resultado
    console.log(resultado.bonificacao_data)
    this.bonificacao.bonificacao_data = resultado.bonificacao_data.slice(0,10)
    console.log(this.bonificacao.bonificacao_data)
  })
}

editarBonificacao(){
  this.bonificacaoService.editarBonificacao(this.bonificacao,this.codigo,this.id_mentor).subscribe({
    complete: () =>{alert("Bonificacao alterada com sucesso")
                    this.location.back()  },
    error: () =>{ alert("Erro: Bonificacao não editada")
                  this.location.back()}
  })
}
}

