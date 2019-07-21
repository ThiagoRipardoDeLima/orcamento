import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrcamentoHeaderComponent } from './orcamento/orcamento-header/orcamento-header.component';
import { OrcamentoMenuComponent } from './orcamento/orcamento-menu/orcamento-menu.component';
import { HomeComponent } from './orcamento/home/home.component';
import { Error404Component } from './error404/error404.component';
import { BasicAuthInterceptor } from './_helper/basic-auth.interceptor';
import { FakeBackendInterceptor } from './_helper/backend';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrcamentoHeaderComponent,
    OrcamentoMenuComponent,
    HomeComponent,
    Error404Component
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
    FakeBackendInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
