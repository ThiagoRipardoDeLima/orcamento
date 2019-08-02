import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from '../../_helper/response';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models';

@Component({
  selector: 'usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  private title = '';
  private subtitle = '';
  private usuarios: User[];
  private formSearch: FormGroup;
  
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private usuarioService: UserService
  ){}

  ngOnInit(){
    this.title = 'USUÁRIOS';
    this.subtitle = 'PESQUISA DE USUÁRIOS';
    this.formInit();
  }

  get f(){return this.formSearch.value}

  formInit(){
      this.formSearch = this.formBuilder.group({
          id:[],
          nome:[''],
          login:['']
      });
  }

  novoUsuario(){
    this.router.navigate(['/usuario/','']);
  }

  buscarUsuario(){
    //pega valores da busca
    let id      = this.f.id;
    let nome    = this.f.nome;
    let login   = this.f.login;
    
    //limpa registros para nova busca
    this.usuarios = null;

    //efetuamos a busca conforme o filtro preenchido
    if(id != 0 && id != null){
        this.usuarioService.getUsuario(id).subscribe(res => this.usuarios.push(res));
        return
    }
    if(nome != ''){
        this.usuarioService.getUsuarioByName(nome).subscribe(res => this.usuarios = res)
        return
    }
    if(login != ''){
        this.usuarioService.getUsuarioByLogin(login).subscribe(res => this.usuarios = res);
        return
    }
    //nenhum filtro informado, busca todos
    this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);

  }

  edita(id: number){
      this.router.navigate(['/usuario/',id]);
  }

  excluir(id:number, index:number){
      if(confirm("Deseja realmente excluir esse registro?")){
          //chama servico para excluir o registro
          this.usuarioService.deleteUsuario(id).subscribe(response => {

              //Pega retorno do servico
              let res:Response = <Response>response;

              //1 = SUCESSO
              //mostra mensagem retornada e remove o registro da tabela
              if(res.codigo == 1){
                  alert(res.mensagem);
                  this.usuarios.splice(index,1);
                  return;
              }
              //0 = EXCEPTION GERADA NO SERVIDOR
              alert(res.mensagem);
          },
          (erro) => {
              //ERROS NAO TRATADOS
              alert(erro);
          })
      }
  }
    
}