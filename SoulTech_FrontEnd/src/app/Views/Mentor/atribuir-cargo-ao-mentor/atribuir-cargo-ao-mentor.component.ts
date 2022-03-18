import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mentor } from 'src/app/Models/mentorModel';
import { Cargo } from 'src/app/Models/cargoModel';
import { MentorService } from 'src/app/services/mentor.service';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-atribuir-cargo-ao-mentor',
  templateUrl: './atribuir-cargo-ao-mentor.component.html',
  styleUrls: ['./atribuir-cargo-ao-mentor.component.css']
})
export class AtribuirCargoAoMentorComponent implements OnInit {

  id_mentor:any

  cargosSemMentor:any
  cargoSemMentorEscolhido:any = []
  mentorSemCargoEscolhido: any = []

  mentor:Mentor ={
    id_mentor:'',
    mentor_nome:'',
    mentor_cargo:'',
    mentor_foto:'',
    mentor_cpf:''
  }

  cargo:Cargo = {
    id_cargo:'',
    ca_nome:'',
    car_atribuicao:''
  }

  constructor(private mentorService:MentorService,
              private route:ActivatedRoute,
              private router:Router,
              private cargoService:CargoService) { }

  ngOnInit(): void {

    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarMentor()
    this.buscarMentorDoCargo()
    this.buscarCargoSemMentor()
  }
// Método criado para buscar um mentor pelo id.
  buscarMentor(){
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe(resultado =>{
      this.mentor = resultado
    })
  }
  // Método criado para buscar um mentor com cargo através do seu id.
  buscarMentorDoCargo(){
    this.cargoService.buscarCargoDoMentor(this.id_mentor).subscribe(resultado =>{

      if(resultado == null){
        this.cargoService.mensagem("Para esse Mentor não está definido um cargo")

      }else{
        this.cargo = resultado
        console.log(resultado);
      }


    })
  }
// Método criado para buscar mentor sem cargo.
  buscarCargoSemMentor(){

    this.cargoService.mostrarCargosSemMentor().subscribe((resultado)=>{

      this.cargosSemMentor = resultado
      console.log("aqui")
      console.log(resultado);

    })

  }
// Método criado para escolha do cargo.
  escolherCargo(){
    console.log(this.cargoSemMentorEscolhido)
    this.cargo = this.cargoSemMentorEscolhido

  }
  // Método criado para atribuir um cargo para o mentor.
  atribuirCargo(){

    this.mentorService.buscarUmMentor(this.id_mentor).subscribe((resultado)=>{
      this.mentor = resultado

    })

    this.cargoService.atribuirMentor(this.cargo, this.cargo.id_cargo,this.mentor.id_mentor).subscribe({
      complete: () => { this.cargoService.mensagem("O cargo foi atribuído ao mentor")
                      this.router.navigate(['/mentor/listaMentores'])},
      error: () => { this.cargoService.mensagem("Erro: o cargo não foi atribuído")
                    this.router.navigate(['/mentor/listaMentores']) }
    })



  }
// Método criado para deixar cargo sem mentor.
  deixarCargoSemMentor(){
    this.cargoService.deixarCargoSemMentor(this.cargo, this.cargo.id_cargo,this.mentor.id_mentor).subscribe({
      complete: () => { this.cargoService.mensagem("O mentor está sem cargo")
                      this.router.navigate(['/mentor/listaMentores'])
                    },
      error: () => { this.cargoService.mensagem("Erro: o mentor não foi retirado da turma")
                    this.router.navigate(['/mentor/listaMentores'])
                  }
    })
  }

}
