import { Funcionario } from 'src/app/Models/funcModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.css']
})
export class ListaFuncionarioComponent implements OnInit {

   funcionarios: Funcionario [] = []
    closeResult:  any = []
  constructor(private funcionarioService: FuncionarioService, private route:ActivatedRoute, private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!;
    this.buscarFuncionario();
  }
  buscarFuncionario(){
    this.funcionarioService.buscarTodosFuncionarios().subscribe((resultado)=>{
      this.funcionarios = resultado;
    })
  }

  chamarFormularioCadastro(){
    this.router.navigate(['/funcionario/cadastro'])
  }

    ////////////MODAL
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

