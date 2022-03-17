import { FuncionarioService } from './../../../services/funcionario.service';
import { MentorService } from 'src/app/services/mentor.service';
 import { CargoService } from 'src/app/services/cargo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mentor } from 'src/app/Models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-mentor',
  templateUrl: './editar-mentor.component.html',
  styleUrls: ['./editar-mentor.component.css']
})
export class EditarMentorComponent implements OnInit {
  idMentor: any;
  id_cargo: any
  mentorCadastrado: boolean = false;
  foto: any;
  mentor: Mentor = {
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',

  };

  constructor( private mentorService: MentorService,
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location) { }

    ngOnInit(): void {
      this.mentor.id_mentor = this.route.snapshot.paramMap.get('id_mentor')!
      this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
      this.mostrarUmMentor();
    }
    cancelarEdicao() {
      this.router.navigate([`mentor/listaMentores`]);
    }

    mostrarUmMentor() {
      this.mentorService
        .buscarUmMentor(this.mentor.id_mentor)
        .subscribe((resultado) => {
          this.mentor = resultado;
          console.log(this.mentor);
        });
    }

    editarMentor() {
      if (this.id_cargo != 0) {
        this.mentorService.editarMentor(this.mentor, this.mentor.id_mentor, this.id_cargo).subscribe({
          complete: () => {
            this.cargoService.mensagem("Mentor(a) editado(a) com sucesso!")
            this.location.back();
          },
          error: () => {
            this.cargoService.mensagem("Erro ao editar mentor(a).")
            // this.location.back();
          },
          next: () => console.log("Mentor(a) editado(a).")
        })
      } else {
        this.mentorService.editarMentorSemCargo(this.mentor, this.mentor.id_mentor).subscribe({
          complete: () => {
            this.cargoService.mensagem("Mentor(a) editado(a) com sucesso!")
            this.location.back();
          },
          error: () => {
            this.cargoService.mensagem("Erro ao editar mentor(a).")
            // this.location.back();
          },
          next: () => console.log("Mentor(a) editado(a).")
        })
      }
    }

    subirFoto(event: any) {

      if (event.target.files && event.target.files[0]) {
        this.foto = event.target.files[0]
        console.log(this.foto)

        const formData = new FormData

        formData.append("foto", this.foto)

        const nome: string = this.mentor.mentor_nome + "-" + event.target.files[0].name

        this.http.post(`http://localhost:8080/empresa/envio/${this.mentor.id_mentor}?nomeDoArquivo=${nome}`, formData).subscribe({
          complete: () => {
            console.log("Foto enviado com sucesso")
          }
        })
        this.cargoService.mensagem("Foto anexada ao mentor")
        this.location.back();
      }
    }

  }

