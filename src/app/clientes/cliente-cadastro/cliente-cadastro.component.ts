import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Estados } from '../../_helper/Enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '../../_helper/response';
import { Cliente } from '../../_models/cliente';
import { ClienteService } from '../../_services/cliente.service';

@Component({
  selector: 'cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
    private title = '';
    private subtitle = '';
    private cliente:Cliente;
    private submitted = false;
    
    /* PARA CARREGAR COMBOS*/
    private estadosKeys = Object.keys(Estados);
    private estadosValue = Estados;

    private formularioCliente: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRouter: ActivatedRoute,
      private clienteService: ClienteService
    ){}

    ngOnInit(){
        this.cliente = new Cliente();
        this.activatedRouter.params.subscribe(parametro=>{
            if(parametro["id"] > 0){
                this.clienteService.getCliente(parametro['id']).subscribe(res => this.cliente = res);
            }
            if(this.cliente.codigo > 0){
                this.title = 'ALTERAR CLIENTE';
                this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE CLIENTES';
            }else{
                this.title = 'NOVO CLIENTE';
                this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE CLIENTES';
            }
        })
        this.criarFormularioDeInsumos(this.cliente);
    }

    get form(){return this.formularioCliente.controls};

    criarFormularioDeInsumos(cliente: Cliente){
        this.formularioCliente = this.formBuilder.group({
            codigo: new FormControl({value:cliente.codigo ,disabled:true},[Validators.required]),
            nome:[cliente.nome, Validators.required],
            rg:[cliente.rg],
            cpf:[cliente.cpf],
            email:[cliente.email],
            cep:[cliente.cep],
            logradouro:[cliente.logradouro],
            numero:[cliente.numero],
            complemento:[cliente.complemento],
            bairro:[cliente.bairro],
            cidade:[cliente.cidade],
            estado:[cliente.estado]
        })
    }

    salvar(){
        this.submitted = true;
        if(!this.formularioCliente.valid){
            return;
        }   
        const dadosFormulario = this.formularioCliente.value;

        this.cliente.codigo     = dadosFormulario.codigo
        this.cliente.nome       = dadosFormulario.nome   
        this.cliente.cpf        = dadosFormulario.cpf    
        this.cliente.rg         = dadosFormulario.rg     
        this.cliente.email      = dadosFormulario.email  
        this.cliente.cep        = dadosFormulario.cep     
        this.cliente.logradouro = dadosFormulario.logradouro
        this.cliente.bairro     = dadosFormulario.bairro 
        this.cliente.cidade     = dadosFormulario.cidade 
        this.cliente.estado     = dadosFormulario.estado 

        // alert(`Formulário: \n ${JSON.stringify(this.insumo)}`);
        if (this.cliente.codigo > 0){
            //chama servico para atualizar insumo
            this.clienteService
                .updateCliente(this.cliente)
                .subscribe(response => {
                    //pega retorno do servidor
                    let res:Response = <Response><unknown>response;
                    //se retorno 1 mostra mensagem de sucesso
                    if(res.codigo == 1){
                        alert(res.mensagem);
                        this.formularioCliente.reset();
                        this.router.navigate(['/clientes'])
                    }
                    //caso ocorra alguma exceção no servidor
                    alert(res.mensagem);
                });
        }else{
            //se codigo = 0, insere novo registro
            this.clienteService
            .addCliente(this.cliente)
            .subscribe(response => {
                //pega retorno do servidor
                let res:Response = <Response><unknown>response;
                //se retorno 1 mostra mensagem de sucesso
                if (res.codigo == 1){
                    alert(res.mensagem);
                    this.formularioCliente.reset();
                    this.router.navigate(['/clientes']);
                }
                alert(res.mensagem);
            })
        }    
    }

    cancelar(e: Event){
        // console.log('Click ' + e);
        this.formularioCliente.reset();
        this.router.navigate(['/clientes']);
    }



}