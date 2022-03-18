import { Cargo } from '../Models/cargoModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
 // A base URL utilizada no backend - definido no java que será utilizada para todos os caminhos.
  baseUrl: String = 'http://localhost:8080/empresa';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  // Métodos criados para conectar a front e back end pela url.
  mostrarTodosCargos(): Observable<Cargo[]> {
    const url = `${this.baseUrl}/cargo`;
    return this.http.get<Cargo[]>(url);
  }

  mostrarCargosSemMentor(): Observable<Cargo[]> {
    const url = `${this.baseUrl}/cargoSemMentor`;

    return this.http.get<Cargo[]>(url);
  }

  mostrarUmCargo(id: string): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.get<Cargo>(url);
  }

  buscarCargoDoMentor(id_mentor: String): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/cargo-mentor/${id_mentor}`;
    return this.http.get<Cargo>(url);
  }

  buscarTodosCargos(): Observable<any> {
    const url = `${this.baseUrl}/cargo/cargo-mentor`;
    return this.http.get<any>(url);
  }

  cadastrarCargo(cargo: Cargo): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/cadastro`;
    return this.http.post<Cargo>(url, cargo);
  }

  editarCargo(cargo: Cargo): Observable<void> {
    const url = `${this.baseUrl}/cargo/edicaoCargo/${cargo.id_cargo}`;
    return this.http.put<void>(url, cargo);
  }
  excluirCargo(id: String): Observable<void> {
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.delete<void>(url);
  }

  atribuirMentor(
    cargo: Cargo,
    id_cargo: String,
    id_mentor: String
  ): Observable<void> {
    const url = `${this.baseUrl}/cargo/definirMentor/${id_cargo}/${id_mentor}`;
    return this.http.put<void>(url, cargo);
  }

  deixarCargoSemMentor(
    cargo: Cargo,
    id_cargo: String,
    id_mentor: String
  ): Observable<void> {
    const url = `${this.baseUrl}/cargo/tirarMentor/${id_cargo}/${id_mentor}`;
    return this.http.put<void>(url, cargo);
  }

  // Método referente ao MatSnackBar do Material, para mostrar mensagem quando as funções de CRUD funcionarem
  mensagem(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['cor-mensagem'],
    });
  }
}
