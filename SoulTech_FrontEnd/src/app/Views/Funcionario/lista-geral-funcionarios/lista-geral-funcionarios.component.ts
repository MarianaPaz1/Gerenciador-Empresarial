import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-lista-geral-funcionarios',
  templateUrl: './lista-geral-funcionarios.component.html',
  styleUrls: ['./lista-geral-funcionarios.component.css']
})
export class ListaGeralFuncionariosComponent implements OnInit {

  funcionarios:any = []
  closeResult:  any = []

  constructor(private funcionarioService: FuncionarioService,
              private route:ActivatedRoute,
              private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.buscarTodosFuncionarios()
  }


  buscarTodosFuncionarios(){
    this.funcionarioService.buscarTodosFuncionarios().subscribe(resultado =>{

      console.log(resultado)


      resultado.forEach((func: any[]) => {

        let funcionariosComCargo: any ={
          id_funcionario:'',
          func_nome:'',
          func_cidade: '',
          id_cargo:'',
          ca_nome:'',
          car_atribuicao:'',
          func_cpf: '',
          func_foto: ''
        }

        funcionariosComCargo.id_funcionario = func[0]
        funcionariosComCargo.func_nome = func[1]
        funcionariosComCargo.func_cidade = func[2]
        funcionariosComCargo.func_cpf = func[4]
        funcionariosComCargo.func_foto = func[3]
        // console.log(func)
        if(func[5] != null){
          funcionariosComCargo.id_cargo = func[5]
          funcionariosComCargo.ca_nome = func[6]
          funcionariosComCargo.car_atribuicao  = func[7]
        }else{
          funcionariosComCargo.id_cargo = 0
          funcionariosComCargo.ca_nome = "----"
          funcionariosComCargo.car_atribuicao = "----"
        }


        this.funcionarios.push(funcionariosComCargo)

      });


    })

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
