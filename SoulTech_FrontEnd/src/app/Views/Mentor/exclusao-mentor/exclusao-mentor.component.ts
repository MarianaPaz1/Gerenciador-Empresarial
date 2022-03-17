import { CargoService } from 'src/app/services/cargo.service';
import { Mentor } from 'src/app/Models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MentorService } from 'src/app/services/mentor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exclusao-mentor',
  templateUrl: './exclusao-mentor.component.html',
  styleUrls: ['./exclusao-mentor.component.css']
})
export class ExclusaoMentorComponent implements OnInit {
  closeResult:  any = []


//  id_cargo: String = ''

 mentor:Mentor ={
  id_mentor:'',
  mentor_nome:'',
  mentor_cargo:'',
  mentor_foto:''
}

  constructor(private modalService: NgbModal, private mentorService:  MentorService,
    private route:ActivatedRoute,
    private location: Location,
    private router:Router, private cargoService:CargoService ) { }

  ngOnInit(): void {
    this.mentor.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarUmMentor()
  }

  buscarUmMentor(){
    this.mentorService.buscarUmMentor(this.mentor.id_mentor).subscribe((resultado) =>{
      this.mentor = resultado
      console.log(this.mentor)
    })
  }

  excluirMentor(){
    this.mentorService.excluirMentor(this.mentor.id_mentor).subscribe({
      next: () => {
        console.log("Excluido")
        this.cargoService.mensagem('Mentor excluido com sucesso')
        this.location.back();
      },
      error: erro => {
        this.cargoService.mensagem('Erro ao excluir mentor, existe cargo associado')
        this.location.back();
      },
      complete: () => {
        console.info('Complete')
      }
    })
   }

   cancelarExclusao() {
    this.router.navigate([`mentor/mentorComCargo`]);
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
