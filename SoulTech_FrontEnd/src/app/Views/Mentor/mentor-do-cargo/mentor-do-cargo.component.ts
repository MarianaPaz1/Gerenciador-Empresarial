import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/services/cargo.service';
import { MentorService } from 'src/app/services/mentor.service';
import { Mentor } from 'src/app/Models/mentorModel';
import { Cargo } from 'src/app/Models/cargoModel';
@Component({
  selector: 'app-mentor-do-cargo',
  templateUrl: './mentor-do-cargo.component.html',
  styleUrls: ['./mentor-do-cargo.component.css']
})
export class MentorDoCargoComponent implements OnInit {
  id_cargo:any

 mentorCadastrado: boolean = false

 mentoresSemCargo:any
mentoresSemCargoEscolhido: any = []

  mentor:Mentor ={
    id_mentor:'',
    mentor_nome:'',
    mentor_cargo:'',
    mentor_foto:''
  }

  cargo:Cargo= {
    id_cargo:'',
    ca_nome:'',
    car_atribuicao:''
  }

  constructor(private mentorService:MentorService,
              private route:ActivatedRoute,
              private router:Router,
              private cargoService:CargoService) { }

  ngOnInit(): void {

    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
       this.buscarMentor()
    this.buscarMentorDoCargo()
    this.buscarMentoresSemCargo()
  }

  buscarMentor(){
    this.mentorService.buscarUmMentor(this.id_cargo).subscribe(resultado =>{
      this.mentor = resultado
    })
  }

  buscarMentorDoCargo(){
    this.mentorService.buscarMentorDoCargo(this.id_cargo).subscribe((resultado)=>{

      if(resultado == undefined){
        alert("Para esse cargo não está definido um mentor")
        this. mentorCadastrado = false
        console.log(resultado);
      }else{
        this.mentor = resultado
        this.mentorCadastrado = true
        console.log(resultado);
      }


    })
  }


  buscarMentoresSemCargo(){

    this.mentorService.buscarMentoresSemCargo().subscribe((resultado)=>{

      this.mentoresSemCargo = resultado
      console.log(this.mentoresSemCargo);

    })

  }

  mostrarMentor(){
    console.log(this.mentoresSemCargoEscolhido)
    this.mentor = this.mentoresSemCargoEscolhido

  }

  atribuirMentor(){

    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe((resultado)=>{
      this.cargo = resultado

    })

    this.cargoService.atribuirMentor(this.cargo, this.id_cargo,this.mentor.id_mentor).subscribe({
      complete: () => { this.cargoService.mensagem("O mentor foi atribuído ao cargo")
                      this.router.navigate(['/cargo'])},
      error: () => { this.cargoService.mensagem("Erro: o mentor foi atribuído ao cargo")
                    this.router.navigate(['/cargo']) }
    })



  }

  deixarCargoSemMentor(){
    this.cargoService.deixarCargoSemMentor(this.cargo, this.id_cargo,this.mentor.id_mentor).subscribe({
      complete: () =>  {this.cargoService.mensagem("O cargo agora está sem mentor")
                      this.router.navigate(['/cargo'])},
      error: () => { this.cargoService.mensagem("Erro: o mentor não foi retirado da turma")
                    this.router.navigate(['/cargo']) }
    })
  }

}
