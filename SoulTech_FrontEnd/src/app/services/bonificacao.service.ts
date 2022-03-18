import { Bonificacao } from './../Models/bonificacaoModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BonificacaoService {
  // A base URL utilizada no backend - definido no java que será utilizada para todos os caminhos.
  baseUrl: String = 'http://localhost:8080/empresa'
  constructor( private http:HttpClient) { }

  // Métodos criados para conectar a front e back end pela url.
  buscarUmaBonificacao(codigo:string):Observable<Bonificacao>{
    const url = `${this.baseUrl}/mentor/bonificacao/${codigo}`
    return this.http.get<Bonificacao>(url)
  }

  listaBonificacaoDoMentor(id_mentor: String):Observable<Bonificacao[]>{
    const url = `${this.baseUrl}/mentor/bonificacao-mentor/${id_mentor}`
    return this.http.get<Bonificacao[]>(url)
  }
  CadastrarBonificacao(bonificacao:Bonificacao, id_mentor: String):Observable<Bonificacao>{
    const url = `${this.baseUrl}/mentor/bonificacao/${id_mentor}`
    return this.http.post<Bonificacao>(url,bonificacao)
  }

  pagarBonificacao(bonificacao:Bonificacao, codigo:string):Observable<Bonificacao>{
    const url = `${this.baseUrl}/mentor/pagarBonificacao/${codigo}`
    return this.http.put<Bonificacao>(url,bonificacao)
  }

  cancelarBonificacao(bonificacao:Bonificacao, codigo:string):Observable<Bonificacao>{
    const url = `${this.baseUrl}/mentor/cancelarBonificacao/${codigo}`
    return this.http.put<Bonificacao>(url,bonificacao)
  }
  editarBonificacao(bonificacao:Bonificacao, codigo:string, id_mentor:string):Observable<Bonificacao>{
    const url = `${this.baseUrl}/mentor/bonificacao/${codigo}/${id_mentor}`
    return this.http.put<Bonificacao>(url,bonificacao)
  }

  excluirBonificacao(codigo:string):Observable<void>{
    const url = `${this.baseUrl}/mentor/bonificacao/${codigo}`
    return this.http.delete<void>(url)
  }
}
