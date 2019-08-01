import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { OrcamentoComponent } from './orcamento/orcamento.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { AuthGuard } from './auth/auth.guard';
import { InsumoAddComponent } from './insumos/insumo-cadastro/insumo-cadastro.component';
import { InsumoListComponent } from './insumos/insumo-lista/insumo.list.component';
import { ComposicaoListComponent } from './composicoes/composicao-lista/composicao-list.component';
import { ComposicaoAddComponent } from './composicoes/composicao-cadastro/composicao-cadastro.component';
import { ComposicaoAddItemComponent } from './composicoes/composicao-cadastro-item/composicao-cadastro-item.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'insumo/:id', component: InsumoAddComponent, canActivate:[AuthGuard]},
  {path:'insumos', component: InsumoListComponent, canActivate:[AuthGuard]},
  {path:'composicao/item/:id', component: ComposicaoAddItemComponent, canActivate:[AuthGuard]},
  {path:'composicao/:id', component: ComposicaoAddComponent, canActivate:[AuthGuard]},
  {path:'composicoes', component: ComposicaoListComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
