import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-lista-mentor',
  templateUrl: './lista-mentor.component.html',
  styleUrls: ['./lista-mentor.component.css']
})
export class ListaMentorComponent implements OnInit {
  closeResult:  any = []
mentores:any = []
  constructor(private mentorService: MentorService,
    private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mostraMentoresComCargo()
  }

  mostraMentoresComCargo(){
       this.mentorService.buscarMentoresComCargo().subscribe(resultado =>{


        resultado.forEach((mentor: any[]) => {

          let mentorComCargo: any ={
            id_mentor:'',
            mentor_nome:'',
            mentor_cargo: '',
            id_cargo:'',
            ca_nome:'',
            ca_atribuicao:'',
            mentor_foto: ''
          }

          mentorComCargo.id_mentor = mentor[0]
          mentorComCargo.mentor_nome = mentor[1]
          mentorComCargo.mentor_cargo= mentor[2]
          mentorComCargo.mentor_foto= mentor[3]
          if(mentor[5] != null){
            mentorComCargo.id_cargo = mentor[5]
            mentorComCargo.ca_nome = mentor[6]
            mentorComCargo.car_atribuicao = mentor[7]
          }else{
            mentorComCargo.id_cargo = 0
            mentorComCargo.ca_nome = "----"
            mentorComCargo.car_atribuicao = "----"
          }


          this.mentores.push(mentorComCargo)

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
