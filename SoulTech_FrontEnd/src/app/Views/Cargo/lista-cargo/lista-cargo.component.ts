import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/Models/cargoModel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-lista-cargo',
  templateUrl: './lista-cargo.component.html',
  styleUrls: ['./lista-cargo.component.css'],

})

export class ListaCargoComponent implements OnInit {
cargos: any = []
closeResult: any = []
  router: any;
  constructor(private cargoService:CargoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mostrarTodosCargos();
  }
//Método criado para mostrar os cargos e suas posições no array, sendo setado com o nome e a sua posição no forEach. A estrutura condicional deverá realizar uma ação para cada um deles.
  mostrarTodosCargos(){
    this.cargoService.buscarTodosCargos().subscribe(resultado =>{
      //this.turmas = resultado;
      console.log("aqui")
      console.log(this.cargos)

      resultado.forEach((cargo: any[]) => {

        let cargosComMentor: any ={
          id_cargo:'',
          ca_nome:'',
          car_atribuicao: '',
          id_mentor:'',
          mentor_nome:'',
          mentor_atribuicao:''
        }

        cargosComMentor.id_cargo = cargo[0]
        cargosComMentor.ca_nome = cargo[1]
        cargosComMentor.car_atribuicao = cargo[2]
        if(cargo[3] != null){
          cargosComMentor.id_mentor = cargo[3]
          cargosComMentor.mentor_nome = cargo[4]
          cargosComMentor.mentor_cargo = cargo[5]
        }else{
          cargosComMentor.id_mentor = 0
          cargosComMentor.mentor_nome = "----"
          cargosComMentor.mentor_cargo = "----"
        }


        this.cargos.push(cargosComMentor)


      });


    })


  }

















  ////////////MODAL para criar avisos de exclusão.
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
