import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/Models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.css'],
})
export class EdicaoCargoComponent implements OnInit {
  cargo: Cargo = {
    id_cargo: '',
    ca_nome: '',
    car_atribuicao: '',
  };
  constructor(
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id');
    this.mostrarUmCargo();
  }

  //Método criado para buscar um cargo.
  mostrarUmCargo() {
    this.cargoService
      .mostrarUmCargo(this.cargo.id_cargo)
      .subscribe((resultado) => {
        this.cargo = resultado;
        console.log(this.cargo)
      });
  }
//método criado de put - para editar o cargo.
  editarCargo() {
    this.cargoService.editarCargo(this.cargo).subscribe({
      complete: () => {
        this.cargoService.mensagem('Cargo editado com sucesso');
        this.router.navigate(['/cargo']);
      },
      error: () => {
        this.cargoService.mensagem('Erro ao editar o cargo');
        this.router.navigate(['/cargo']);
      },
      next: () => {
        console.log('Cargo editado com sucesso');
      },
    });
    this.router.navigate(['/cargo']);
  }
// método criado para mudar a rota
  cancelarEdicao() {
    this.router.navigate(['/cargo']);
  }
}
