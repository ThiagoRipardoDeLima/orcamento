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
  private usuario:User = new User();;
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
    this.criarFormulario(this.usuario);

    let id;
    this.activatedRouter.params.subscribe(parametro=>{
       id = parametro["id"];
    })
    if(id > 0){
        this.usuarioService
            .getUsuario(id)
            .subscribe(res => {
                this.usuario = res;
               
                this.formulario.setValue({
                    codigo: this.usuario.usucod,
                    nome:this.usuario.usunome,
                    login:this.usuario.usulogin,
                    password:this.usuario.ususenha,
                    email:this.usuario.usuemail,
                    status:TipoStatus[this.usuario.usustatus]
                })
                
            });
        
    }

    if(id > 0){
        this.title = 'ALTERAR USUÁRIO';
        this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE USUÁRIOS';
    }else{
        this.title = 'NOVO USUÁRIO';
        this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE USUÁRIOS';
    }
    
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
    const dadosFormulario = this.formulario.getRawValue();

    this.usuario.usucod     = dadosFormulario.codigo;   
    this.usuario.usunome    = dadosFormulario.nome;
    this.usuario.usulogin   = dadosFormulario.login;  
    this.usuario.usucriadoem= new Date();
    this.usuario.ususenha   = dadosFormulario.password;  
    this.usuario.usuemail   = dadosFormulario.email;  
    this.usuario.usustatus  = TipoStatus[dadosFormulario.status];

    // console.log(`Formulário: \n ${JSON.stringify(this.usuario)}`);
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
                    this.router.navigate(['/usuarios']);
                    return;
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
                return;
            }
            alert(res.mensagem );
        })
    }    
  } 

  cancelar(e: Event){
      // console.log('Click ' + e);
      this.formulario.reset();
      this.router.navigate(['/usuarios']);
  }



}


   
    
    

    