import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../Models/funcModel';
import { Cargo } from '../Models/cargoModel';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }
// A base URL utilizada no backend - definido no java que será utilizada para todos os caminhos.
  baseUrl: string = "http://localhost:8080/empresa"
  // Métodos criados para conectar a front e back end pela url.
  buscarTodosFuncionarios():Observable<any>{
    const url = `${this.baseUrl}/funcionario-cargo`
    return this.http.get<any>(url)
  }

  buscarFuncionarioCargo(id_cargo: string):Observable<Funcionario[]>{
    const url = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}`
    return this.http.get<Funcionario[]>(url);
  }

  buscarUmFuncionario(id_funcionario: string):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.get<Funcionario>(url)
  }

//  CadastrarFuncionario(funcionario:Funcionario, id_cargo:string): Observable<Funcionario> {
//   const URL = `${this.baseUrl}/funcionario?cargo=${id_cargo}`
//   return this.http.post<Funcionario>(URL, funcionario)
// }

  CadastrarFuncionario(funcionario:Funcionario): Observable<Funcionario> {
  const URL = `${this.baseUrl}/funcionario`
  return this.http.post<Funcionario>(URL, funcionario)
}



  deleteFuncionario(id_funcionario: string):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.delete<Funcionario>(url)
  }



  editarFunc(func: Funcionario, id_funcionario:String, id_cargo: String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  editarFuncSemCargo(func: Funcionario, id_funcionario:String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionarioSemCargo/${id_funcionario}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }


  atribuirCargo(cargo:Cargo, id_funcionario:String):Observable<Funcionario>{

    const url = `${this.baseUrl}/funcionario/inserirCargo/${id_funcionario}`
    return this.http.put<Funcionario>(url,cargo)

  }

  deixarFuncionarioSemCargo(funcionario:Funcionario, id_funcionario:String):Observable<Funcionario>{
     const url = `${this.baseUrl}/funcionario/deixarSemCargo/${id_funcionario}`
    return this.http.put<Funcionario>(url,funcionario)
  }

  buscarFuncionarioPeloCpf(func_cpf:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario-cpf/${func_cpf}`
    return this.http.get<Funcionario>(url)
  }
}
