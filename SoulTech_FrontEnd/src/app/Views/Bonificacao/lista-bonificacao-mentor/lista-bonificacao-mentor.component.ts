import { CargoService } from 'src/app/services/cargo.service';
import { MentorService } from 'src/app/services/mentor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BonificacaoService } from './../../../services/bonificacao.service';
import { Bonificacao } from './../../../Models/bonificacaoModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-bonificacao-mentor',
  templateUrl: './lista-bonificacao-mentor.component.html',
  styleUrls: ['./lista-bonificacao-mentor.component.css']
})
export class ListaBonificacaoMentorComponent implements OnInit {
id_mentor: any
bonificacoes: Bonificacao[] = []
nomeMentor: String = ''
recebido:boolean = false
cancelado:boolean = false

bonificacao:Bonificacao ={
  codigo:'',
  bonificacao_descricao:'',
  bonificacao_data:'',
  bonificacao_status:'',
  bonificacao_valor:0,
}

  constructor(private cargoService:CargoService,private bonificacaoService: BonificacaoService, private route: ActivatedRoute, private router: Router, private mentorService: MentorService) { }

  ngOnInit(): void {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.listarBonificacao()
  }
// método criado para listar as bonificações de um mentor específico.
  listarBonificacao(){
    this.bonificacaoService.listaBonificacaoDoMentor(this.id_mentor).subscribe(resultado=>{
      this.bonificacoes = resultado
    })
  }

  buscarMentor(){
this.mentorService.buscarUmMentor(this.id_mentor).subscribe(resultado =>{
  this.nomeMentor = resultado.mentor_nome
})
}

// Botão que quita a bonificação que está lá - muda o status;
pagarBonificacao(codigo:any){

  this.bonificacaoService.buscarUmaBonificacao(codigo).subscribe(resultado =>{
    this.bonificacao = resultado

    console.log(this.bonificacao)

    this.bonificacaoService.pagarBonificacao(this.bonificacao,this.bonificacao.codigo).subscribe({
      complete: () => {this.cargoService.mensagem("Bonificacao paga com sucesso")
                       this.listarBonificacao()},
      error: () => {this.cargoService.mensagem("Erro: A bonificacao não foi paga")}
    })
  })

}

// botão que cancela a bonificação - muda o status.
cancelarBonificacao(codigo:any){

  this.bonificacaoService.buscarUmaBonificacao(codigo).subscribe(resultado =>{
    this.bonificacao = resultado

    console.log(this.bonificacao)

    this.bonificacaoService.cancelarBonificacao(this.bonificacao,this.bonificacao.codigo).subscribe({
      complete: () => {this.cargoService.mensagem("Bonificacao cancelada com sucesso.")
                       this.listarBonificacao()},
      error: () => {this.cargoService.mensagem("Erro: Bonificacao não cancelada.")}
    })
  })

}

}
