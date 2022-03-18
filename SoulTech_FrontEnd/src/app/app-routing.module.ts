import { ExclusaoBonificacaoComponent } from './Views/Bonificacao/exclusao-bonificacao/exclusao-bonificacao.component';
import { EdicaoBonificacaoComponent } from './Views/Bonificacao/edicao-bonificacao/edicao-bonificacao.component';
import { ListaBonificacaoMentorComponent } from './Views/Bonificacao/lista-bonificacao-mentor/lista-bonificacao-mentor.component';
import { CadastrarBonificacaoComponent } from './Views/Bonificacao/cadastrar-bonificacao/cadastrar-bonificacao.component';
import { CadastrarMentorComponent } from './Views/Mentor/cadastrar-mentor/cadastrar-mentor.component';
import { EditarMentorComponent } from './Views/Mentor/editar-mentor/editar-mentor.component';
import { ExclusaoMentorComponent } from './Views/Mentor/exclusao-mentor/exclusao-mentor.component';
import { AtribuirCargoComponent } from './Views/Funcionario/atribuir-cargo/atribuir-cargo.component';
import { ListaMentorComponent } from './Views/Mentor/lista-mentor/lista-mentor.component';
import { MentorDoCargoComponent } from './Views/Mentor/mentor-do-cargo/mentor-do-cargo.component';
import { AtribuirCargoAoMentorComponent } from './Views/Mentor/atribuir-cargo-ao-mentor/atribuir-cargo-ao-mentor.component';
import { ListaGeralFuncionariosComponent} from './Views/Funcionario/lista-geral-funcionarios/lista-geral-funcionarios.component';
import { EdicaoFuncionarioComponent } from './Views/Funcionario/edicao-funcionario/edicao-funcionario.component';
import { ListaFuncionarioComponent } from './Views/Funcionario/lista-funcionario/lista-funcionario.component';
import { ExclusaoFuncionarioComponent } from './Views/Funcionario/exclusao-funcionario/exclusao-funcionario.component';
import { CadastroFuncionarioComponent } from './Views/Funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { EdicaoCargoComponent } from './Views/Cargo/edicao-cargo/edicao-cargo.component';
import { ExclusaoCargoComponent } from './Views/Cargo/exclusao-cargo/exclusao-cargo.component';
import { CadastroCargoComponent } from './Views/Cargo/cadastro-cargo/cadastro-cargo.component';
import { ListaCargoComponent } from './Views/Cargo/lista-cargo/lista-cargo.component';
import { HomeComponent } from './Templates/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaFuncionarioDoCargoComponent } from './Views/Funcionario/lista-funcionario-do-cargo/lista-funcionario-do-cargo.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
   {path:"home", component: HomeComponent},

   //Rotas dos cargos
  {path:"cargo", component: ListaCargoComponent},
  {path:"cargo/cadastro", component: CadastroCargoComponent},
  {path:"exclusaoCargo/:id", component: ExclusaoCargoComponent},
  {path:"edicaoCargo/:id", component: EdicaoCargoComponent},

  // Rotas dos funcionários
  {path:"funcionarioCargo/:id_cargo", component:ListaFuncionarioComponent},
  {path:"funcionario/cadastrar", component: CadastroFuncionarioComponent},
  {path:"funcionarioExclusao/:id_funcionario", component: ExclusaoFuncionarioComponent },
  {path:"funcionario/edicao/:id_funcionario", component: EdicaoFuncionarioComponent},
  {path:"listaGeralFuncionarios", component: ListaGeralFuncionariosComponent},
  {path:"atribuirCargo/:id_funcionario/:id_cargo", component: AtribuirCargoComponent},
  {path:"funcionario/:id_cargo", component:ListaFuncionarioDoCargoComponent},

  //Rotas do mentor
  {path:"mentor/listaMentores", component: ListaMentorComponent},
  {path:"mentorDoCargo/:id_cargo", component: MentorDoCargoComponent},
  {path:"atribuirCargo/:id_mentor", component: AtribuirCargoAoMentorComponent},
  {path:"mentor/deletar/:id_mentor", component: ExclusaoMentorComponent},
  {path: "mentor/editar/:id_mentor/:id_cargo", component: EditarMentorComponent},
  {path:"mentor/cadastro", component:CadastrarMentorComponent},

  // Rotas da bonificação
  {path:"bonificacao/cadastro/:id_mentor", component:CadastrarBonificacaoComponent},
  {path:"bonificacao/listaPorMentor/:id_mentor", component:ListaBonificacaoMentorComponent},
  {path:"bonificacao/edicao/:codigo/:id_mentor", component:EdicaoBonificacaoComponent},
  {path:"bonificacao/exclusao/:codigo/:id_mentor", component:ExclusaoBonificacaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
