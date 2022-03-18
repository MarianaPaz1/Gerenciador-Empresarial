import { MentorService } from 'src/app/services/mentor.service';
import { CargoService } from 'src/app/services/cargo.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Mentor } from 'src/app/Models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-mentor',
  templateUrl: './cadastrar-mentor.component.html',
  styleUrls: ['./cadastrar-mentor.component.css']
})
export class CadastrarMentorComponent implements OnInit {

  idMentorCadastrado: any

  mentorCadastrado: boolean = false

  mentor: Mentor = {
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',
    mentor_cpf: ''
  }

  foto: any

  constructor(private mentorService: MentorService, private router: Router, private http: HttpClient, private cargoService: CargoService, private location: Location) { }

  ngOnInit(): void {
  }

  // Método criado para redirecionar a rota.
  cancelarCadastro() {
    this.router.navigate([`mentor/mentorComCargo`])
  }

  // Método criado para o cadastro do mentor.
  cadastrarMentor() {
    this.mentorService.cadastrarMentor(this.mentor).subscribe({
      next: () => {

        this.mentorService.buscarMentorPeloCpf(this.mentor.mentor_cpf).subscribe(resultado => {
          console.log(resultado)
          this.idMentorCadastrado = resultado.id_mentor

                    this.mentorCadastrado = true
          this.cargoService.mensagem("Mentor cadastrado com sucesso")
        })
      },
      error: () => {
        this.cargoService.mensagem("Não foi possível cadastrar o mentor")
      }
    })
  }


  // Método criado para subir a foto c/ service.
  subirFoto(event: any) {

    if (event.target.files && event.target.files[0]) { //subindo um arquivo que está na posição zero - apenas uma foto.
      this.foto = event.target.files[0]
      console.log(this.foto)

      const formData = new FormData

      formData.append("foto", this.foto)

      const nome: string = this.mentor.mentor_nome + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/envio/${this.idMentorCadastrado}?nomeDoArquivo=${nome}`, formData).subscribe({
        complete: () => {
          console.log("Foto enviado com sucesso")
        }
      })
      this.cargoService.mensagem("Foto anexada ao mentor")
      this.location.back();
    }
  }


}
