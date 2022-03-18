import { Bonificacao } from './../../../Models/bonificacaoModel';
import { Component, OnInit } from '@angular/core';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exclusao-bonificacao',
  templateUrl: './exclusao-bonificacao.component.html',
  styleUrls: ['./exclusao-bonificacao.component.css']
})
export class ExclusaoBonificacaoComponent implements OnInit {


  codigo:any
 id_mentor:any

  statusEscolhidoNoSelect:any

  statusParaEscolha:string[] = []

  bonificacao:Bonificacao ={
    codigo:'',
    bonificacao_descricao:'',
    bonificacao_data:'',
    bonificacao_status:'',
    bonificacao_valor:0
  }
  closeResult:  any = []
  constructor(private   bonificacaoService:  BonificacaoService,
              private route:ActivatedRoute,
              private location: Location,
              private router:Router, private modalService: NgbModal) { }



  ngOnInit(): void {

    this.codigo = this.route.snapshot.paramMap.get('codigo')
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.statusParaEscolha = ['RECEBIDO','CANCELADO','PENDENTE']
    this.mostrarBonificacao()

  }
// método criado para buscar as bonificações.
  mostrarBonificacao(){
    this.bonificacaoService.buscarUmaBonificacao(this.codigo).subscribe(resultado =>{
      this.bonificacao = resultado
      this.bonificacao.bonificacao_status = resultado.bonificacao_status
    })
  }
// método criado para excluir uma bonificação que é buscada pelo id e o cargo.
  excluirBonificacao(){
    this.bonificacaoService.excluirBonificacao(this.codigo).subscribe({
      complete: () => {alert("bonificação excluída com sucesso"),
      this.location.back() },
      error: () => {alert("Erro: A bonificação não foi excluída")}
    })
  }

  statusEscolhido(){
    console.log(this.statusEscolhidoNoSelect)
    this.bonificacao.bonificacao_status = this.statusEscolhidoNoSelect

  }
          ////////////MODAL criado para sinalizar que as informações serão excluídas - AVISO
  // Função para abrir modal
  open(content: any) {
    //formato do modal
    this.modalService.open(content, { size: 'md' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  } //open

  // Função para fechar modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } //getDismissReason
}
