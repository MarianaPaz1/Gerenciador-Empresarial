import { HomeComponent } from './Templates/home/home.component';
import {  LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroCargoComponent } from './Views/Cargo/cadastro-cargo/cadastro-cargo.component';
import { EdicaoCargoComponent } from './Views/Cargo/edicao-cargo/edicao-cargo.component';
import { ExclusaoCargoComponent } from './Views/Cargo/exclusao-cargo/exclusao-cargo.component';
import { ListaCargoComponent } from './Views/Cargo/lista-cargo/lista-cargo.component';
import { FooterComponent } from './Templates/footer/footer.component';
import { HeaderComponent } from './Templates/header/header.component';
import { CadastroFuncionarioComponent } from './Views/Funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaFuncionarioComponent } from './Views/Funcionario/lista-funcionario/lista-funcionario.component';
import { ExclusaoFuncionarioComponent } from './Views/Funcionario/exclusao-funcionario/exclusao-funcionario.component';
import { EdicaoFuncionarioComponent } from './Views/Funcionario/edicao-funcionario/edicao-funcionario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MentorDoCargoComponent } from './Views/Mentor/mentor-do-cargo/mentor-do-cargo.component';
import { ListaMentorComponent } from './Views/Mentor/lista-mentor/lista-mentor.component';
import { AtribuirCargoAoMentorComponent } from './Views/Mentor/atribuir-cargo-ao-mentor/atribuir-cargo-ao-mentor.component';
import { AtribuirCargoComponent } from './Views/Funcionario/atribuir-cargo/atribuir-cargo.component';
import { ListaGeralFuncionariosComponent } from './Views/Funcionario/lista-geral-funcionarios/lista-geral-funcionarios.component';
import { ListaFuncionarioDoCargoComponent } from './Views/Funcionario/lista-funcionario-do-cargo/lista-funcionario-do-cargo.component';
import { ExclusaoMentorComponent } from './Views/Mentor/exclusao-mentor/exclusao-mentor.component';
import { CadastrarMentorComponent } from './Views/Mentor/cadastrar-mentor/cadastrar-mentor.component';
import { EditarMentorComponent } from './Views/Mentor/editar-mentor/editar-mentor.component';
import { ListaBonificacaoMentorComponent } from './Views/Bonificacao/lista-bonificacao-mentor/lista-bonificacao-mentor.component';
import { CadastrarBonificacaoComponent } from './Views/Bonificacao/cadastrar-bonificacao/cadastrar-bonificacao.component';
import { NgxCurrencyModule } from "ngx-currency";
import { EdicaoBonificacaoComponent } from './Views/Bonificacao/edicao-bonificacao/edicao-bonificacao.component';
import { ExclusaoBonificacaoComponent } from './Views/Bonificacao/exclusao-bonificacao/exclusao-bonificacao.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    CadastroCargoComponent,
    EdicaoCargoComponent,
    ExclusaoCargoComponent,
    HomeComponent,
    ListaCargoComponent,
    FooterComponent,
    HeaderComponent,
    CadastroFuncionarioComponent,
    ListaFuncionarioComponent,
    ExclusaoFuncionarioComponent,
    EdicaoFuncionarioComponent,
    MentorDoCargoComponent,
    ListaMentorComponent,
    AtribuirCargoAoMentorComponent,
    AtribuirCargoComponent,
    ListaGeralFuncionariosComponent,
    ListaFuncionarioDoCargoComponent,
    ExclusaoMentorComponent,
    CadastrarMentorComponent,
    EditarMentorComponent,


     ListaBonificacaoMentorComponent,
     CadastrarBonificacaoComponent,
     EdicaoBonificacaoComponent,
     ExclusaoBonificacaoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgbModule,
    NgxCurrencyModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "pt-BR"},
{provide: DEFAULT_CURRENCY_CODE, useValue:"BRL"},
CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
