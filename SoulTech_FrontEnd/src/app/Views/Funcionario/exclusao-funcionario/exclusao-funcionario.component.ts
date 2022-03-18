import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/Models/funcModel';
import { CargoService } from 'src/app/services/cargo.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exclusao-funcionario',
  templateUrl: './exclusao-funcionario.component.html',
  styleUrls: ['./exclusao-funcionario.component.css']
})
export class ExclusaoFuncionarioComponent implements OnInit {
  id_cargo: String = ''
  closeResult:  any = []
   funcionario: Funcionario = {
    id_funcionario: '',
    func_cidade: '',
    func_nome: '',
    id_cargo: '',
    func_cpf: '',
    func_foto: '',

  }

  constructor(private cargoService: CargoService, private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
    this.funcionario.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")
    this.buscarUmFuncionario()
  }

  // Método criado para buscar um funcionário.
  buscarUmFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.funcionario.id_funcionario).subscribe((resultado)=>{
      this. funcionario = resultado;
    })
  }

  // Método criado para deletar um funcionário.
  deleteFuncionario(){
    this.funcionarioService.deleteFuncionario(this.funcionario.id_funcionario).subscribe({
      complete: () =>{ this.cargoService.mensagem("Funcionario deletado com sucesso"),
      this.router.navigate([`/listaGeralFuncionarios`])},
    error: () => { this.cargoService.mensagem("Erro! O aluno não pode ser excluído"),
  this.router.navigate([`/listaGeralFuncionarios`])}
  })
}

// Método criado para redirecionar a página.
cancelarExclusao(){
  this.router.navigate(['/listaGeralFuncionarios'])
}


        ////////////MODAL feito para criar aviso de exclusão
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
