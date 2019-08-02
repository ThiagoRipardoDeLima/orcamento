import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { TipoStatus } from '../../_helper/Enums';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '../../_helper/response';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {
  private title = '';
  private subtitle = '';
  private usuario:User;
  private submitted = false;

  /* PARA CARREGAR COMBOS*/
  getTipoStatus(): Array<string>{
    var statusKeys = Object.keys(TipoStatus);
    return statusKeys.slice(0,statusKeys.length/2);
  }

  private statusValue = TipoStatus;

  private formulario: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private usuarioService: UserService
  ){}

  ngOnInit() {
    this.usuario = new User();
    this.activatedRouter.params.subscribe(parametro=>{
        if(parametro["id"] > 0){
            this.usuarioService.getUsuario(parametro['id']).subscribe(res => this.usuario = res);
        }
        if(this.usuario.usucod > 0){
            this.title = 'ALTERAR USUÁRIO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE USUÁRIOS';
        }else{
            this.title = 'NOVO USUÁRIO';
            this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE USUÁRIOS';
        }
    })
    this.criarFormulario(this.usuario);
  }

  get form(){return this.formulario.controls};

  criarFormulario(usuario: User){
      this.formulario = this.formBuilder.group({
          codigo: new FormControl({value:usuario.usucod ,disabled:true},[Validators.required]),
          nome:[usuario.usunome, Validators.required],
          login:[usuario.usulogin, Validators.required],
          password:[usuario.ususenha, Validators.required],
          email:[usuario.usuemail],
          status:[usuario.usustatus,Validators.required],
      })
  }

  salvar(){
    this.submitted = true;
    if(!this.formulario.valid){
        return;
    }   
    const dadosFormulario = this.formulario.value;

    this.usuario.usucod     = dadosFormulario.usucod   
    this.usuario.usunome    = dadosFormulario.usunome   
    this.usuario.usulogin   = dadosFormulario.usulogin  
    this.usuario.ususenha   = dadosFormulario.password  
    this.usuario.usuemail   = dadosFormulario.usuemail  
    this.usuario.usustatus  = dadosFormulario.usustatus  
    
    // alert(`Formulário: \n ${JSON.stringify(this.insumo)}`);
    if (this.usuario.usucod > 0){
        //chama servico para atualizar insumo
        this.usuarioService
            .updateUsuario(this.usuario)
            .subscribe(response => {
                //pega retorno do servidor
                let res:Response = <Response><unknown>response;
                //se retorno 1 mostra mensagem de sucesso
                if(res.codigo == 1){
                    alert(res.mensagem);
                    this.formulario.reset();
                    this.router.navigate(['/usuarios'])
                }
                //caso ocorra alguma exceção no servidor
                alert(res.mensagem);
            });
    }else{
        //se codigo = 0, insere novo registro
        this.usuarioService
        .addUsuario(this.usuario)
        .subscribe(response => {
            //pega retorno do servidor
            let res:Response = <Response><unknown>response;
            //se retorno 1 mostra mensagem de sucesso
            if (res.codigo == 1){
                alert(res.mensagem);
                this.formulario.reset();
                this.router.navigate(['/usuarios']);
            }
            alert(res.mensagem);
        })
    }    
  } 

  cancelar(e: Event){
      // console.log('Click ' + e);
      this.formulario.reset();
      this.router.navigate(['/usuarios']);
  }



}


   
    
    

    