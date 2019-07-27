import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { OrcamentoComponent } from './orcamento/orcamento.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { AuthGuard } from './auth/auth.guard';
import { InsumoAddComponent } from './insumos/insumo-cadastro/insumo-cadastro.component';
import { InsumoListComponent } from './insumos/insumo-lista/insumo.list.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'insumos/:id', component: InsumoAddComponent, canActivate:[AuthGuard]},
  {path:'insumos', component: InsumoListComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
