import { Observable } from 'rxjs';
import { Mentor } from '../Models/mentorModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
// A base URL utilizada no backend - definido no java que será utilizada para todos os caminhos.
  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient) { }

  // Métodos criados para conectar a front e back end pela url.
  buscarUmMentor(id_mentor: String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.get<Mentor>(url)
  }

  buscarMentorDoCargo(id_cargo: String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-cargo/${id_cargo}`
    return this.http.get<Mentor>(url)
   }


  buscarMentoresSemCargo():Observable<Mentor[]>{
    const URL = `${this.baseUrl}/mentorSemCargo`
    return this.http.get<Mentor[]>(URL);
   }

   buscarMentoresComCargo():Observable<any[]>{
    const url = `${this.baseUrl}/mentor/mentor-cargo`
    return this.http.get<any>(url)
   }

   cadastrarMentor(mentor: Mentor): Observable<Mentor>{
    const url = `${this.baseUrl}/mentor`
    return this.http.post<Mentor>(url, mentor)
  }

  excluirMentor(id_mentor:string):Observable<void>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.delete<void>(url)
  }

  editarMentor(mentor: Mentor, id_mentor: string, id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}?cargo=${id_cargo}`
    return this.http.put<Mentor>(URL, mentor)
  }

  editarMentorSemCargo(mentor: Mentor, id_mentor:String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentorSemCargo/${id_mentor}`
    return this.http.put<Mentor>(URL, mentor)
  }

  buscarMentorPeloCpf(mentor_cpf:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-cpf/${mentor_cpf}`
    return this.http.get<Mentor>(url)
  }


}
