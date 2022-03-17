
import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/Models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-exclusao-cargo',
  templateUrl: './exclusao-cargo.component.html',
  styleUrls: ['./exclusao-cargo.component.css']
})
export class ExclusaoCargoComponent implements OnInit {
  closeResult:  any = []
  cargo:Cargo = {
    id_cargo: '',
    ca_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService:CargoService, private route:ActivatedRoute, private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id')
    this.mostrarUmCargo()
  }

  mostrarUmCargo(){
    this.cargoService.mostrarUmCargo(this.cargo.id_cargo).subscribe((resultado)=> {
      this.cargo = resultado
      console.log(this.cargo)
    })
  }

  excluirCargo(){
    this.cargoService.excluirCargo(this.cargo.id_cargo).subscribe({
      next: () => {
        console.log("editada")
        this.cargoService.mensagem('Cargo excluído com sucesso!')
      },
      error: erro => {
        this.cargoService.mensagem('O cargo não pode ser excluído.')
        this.router.navigate(['/cargo'])
      },
      complete: () => {
        console.info('Complete')
        this.router.navigate(['/cargo'])
      }
    })
  }
  cancelarExclusao(){
    this.router.navigate(['/cargo'])
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
