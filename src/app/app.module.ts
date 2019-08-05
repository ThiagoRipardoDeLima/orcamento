import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { LoginComponent } from './login/login.component';
import { OrcamentoHeaderComponent } from './home/home-header/orcamento-header.component';
import { OrcamentoMenuComponent } from './home/home-menu/orcamento-menu.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { BasicAuthInterceptor } from './_helper/basic-auth.interceptor';
// import { FakeBackendInterceptor } from './_helper/backend';
import { InsumoAddComponent } from './insumos/insumo-cadastro/insumo-cadastro.component';
import { InsumoListComponent } from './insumos/insumo-lista/insumo.list.component';
import { HomeBreadcumb } from './home/home-breadcumb/home-breadcumb.component';
import { ComposicaoListComponent } from './composicoes/composicao-lista/composicao-list.component';
import { ComposicaoAddComponent } from './composicoes/composicao-cadastro/composicao-cadastro.component';
import{ ComposicaoAddItemComponent } from './composicoes/composicao-cadastro-item/composicao-cadastro-item.component';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteCadastroComponent } from './clientes/cliente-cadastro/cliente-cadastro.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { OrcamentoListaComponent } from './orcamentos/orcamento-lista/orcamento-lista.component';
import { OrcamentoCadastroComponent } from './orcamentos/orcamento-cadastro/orcamento-cadastro.component';

registerLocaleData(ptBr);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrcamentoHeaderComponent,
    OrcamentoMenuComponent,
    HomeComponent,
    Error404Component,
    InsumoAddComponent,
    InsumoListComponent,
    ComposicaoListComponent,
    ComposicaoAddComponent,
    ComposicaoAddItemComponent,
    HomeBreadcumb,
    ClienteListaComponent,
    ClienteCadastroComponent,
    UsuarioListaComponent,
    UsuarioCadastroComponent,
    OrcamentoListaComponent,
    OrcamentoCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide:LOCALE_ID, useValue:"pt"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
