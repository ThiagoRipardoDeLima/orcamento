import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Estados, TipoComposicao } from '../../_helper/Enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '../../_helper/response';
import { Orcamento } from '../../_models/orcamento';
import { OrcamentoService } from '../../_services/orcamento.service';

@Component({
  selector: 'orcamento-cadastro',
  templateUrl: './orcamento-cadastro.component.html',
  styleUrls: ['./orcamento-cadastro.component.css']
})
export class OrcamentoCadastroComponent implements OnInit {

    private title = '';
    private subtitle = '';
    private passos = 'ETAPA 1/2';
    private orcamento:Orcamento = new Orcamento();
    private submitted = false;
    private isLicitacaoInput=false;
    /* PARA CARREGAR COMBOS*/
    private estadosKeys = Object.keys(Estados);
    private estadosValue = Estados;
    private datas: String[] = ['08/2019','07/2019','06/2019','05/2019','04/2019','03/2019'];
    /** */

    private formulario: FormGroup;
    
    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRouter: ActivatedRoute,
                private orcamentoService: OrcamentoService){}
  
    ngOnInit(){
        let id = 0;
        this.activatedRouter.params.subscribe(parametro=>{
           id = parametro["id"];
        })

        this.title = 'NOVO ORCAMENTO';
        this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE ORÇAMENTO';

        if(id > 0){
            this.title = 'ALTERAR ORÇAMENTO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE ORÇAMENTO';
            this.orcamentoService
                .getOrcamento(id)
                .subscribe(res => {
                    console.log(res.estado);
                    this.formulario.setValue({
                        codigo          : res.codigo,
                        descricao       : res.descricao,
                        estado          : res.estado,
                        datasinapi      : res.datasinapi,
                        cliente         : res.cliente,
                        // criadoem        : res.criadoem,
                        islicitacao     : res.islicitacao,
                        tipolicitacao   : res.tipolicitacao,
                        datahoralicitacao : res.datahoralicitacao,
                        numeroprocesso  : res.numeroprocesso
                    })
                });
        }
        this.criarFormulario(this.orcamento);
    }

    get form(){return this.formulario.controls};

    criarFormulario(orcamento: Orcamento){
        this.formulario = this.formBuilder.group({
            codigo: new FormControl({value:orcamento.codigo ,disabled:true},[Validators.required]),
            descricao:[orcamento.descricao, Validators.required],
            estado:[orcamento.estado, Validators.required],
            datasinapi:[orcamento.datasinapi, Validators.required],
            cliente:[orcamento.cliente],
            islicitacao:[orcamento.islicitacao],
            tipolicitacao:[orcamento.tipolicitacao],
            datahoralicitacao:[orcamento.datahoralicitacao],
            numeroprocesso:[orcamento.numeroprocesso],
        })
    }

    salvar(){
        this.submitted = true;
        if(!this.formulario.valid){
            return;
        }   
        const dadosFormulario = this.formulario.getRawValue();
        
        this.orcamento.codigo              = dadosFormulario.codigo;
        this.orcamento.descricao           = dadosFormulario.descricao;
        this.orcamento.estado              = Estados[dadosFormulario.estado];
        this.orcamento.datasinapi          = dadosFormulario.datasinapi;
        this.orcamento.cliente             = dadosFormulario.cliente;
        this.orcamento.criadoem            = new Date();
        this.orcamento.islicitacao         = dadosFormulario.islicitacao;
        this.orcamento.tipolicitacao       = dadosFormulario.tipolicitacao; 
        this.orcamento.datahoralicitacao   = dadosFormulario.datahoralicitacao;
        this.orcamento.numeroprocesso      = dadosFormulario.numeroprocesso;

        console.log(`Formulário: \n ${JSON.stringify(this.orcamento)}`);
        if (this.orcamento.codigo > 0){
            //chama servico para atualizar composicao
            this.orcamentoService
                .updateOrcamento(this.orcamento)
                .subscribe(response => {
                    //pega retorno do servidor
                    let res:Response = <Response><unknown>response;
                    //se retorno 1 mostra mensagem de sucesso
                    if(res.codigo == 1){
                        alert(res.mensagem);
                        this.formulario.reset();
                        this.router.navigate(['/orcamento/item/',this.orcamento.codigo]);
                        return;
                    }
                    //caso ocorra alguma exceção no servidor
                    alert(res.mensagem);
                },
                error => {
                    alert('Serviço indisponível no momento. Contate o administrador do sistema e informe o código(' + error.status + ' - ' + error.statusText + ').');
                });
        }else{
            //se codigo = 0, insere novo registro
            this.orcamentoService
            .addOrcamento(this.orcamento)
            .subscribe(response => {
                //pega retorno do servidor
                let res:Response = <Response><unknown>response;
                //se retorno 1 mostra mensagem de sucesso
                if (res.codigo > 0){
                    alert(res.mensagem);
                    this.formulario.reset();
                    this.router.navigate(['/orcamento/item/',res.codigo]);
                    return;
                }
                alert(res.mensagem);
            },
            error => {
                alert('Serviço indisponível no momento. Contate o administrador do sistema e informe o código(' + error.status + ' - ' + error.statusText + ').');
            });
        }   
    }//SALVAR

    cancelar(e: Event){
        // console.log('Click ' + e);
        this.formulario.reset();
        this.router.navigate(['/orcamentos']);
    }

    getLastId():number{
        let id = 0;
        this.orcamentoService
        .getOrcamentoByLastId()
        .subscribe(response => {
            let res:Response = <Response><unknown>response;
            alert(res.codigo);
            
            id = res.codigo;
        });
        return id;
    }

    toggleVisibility(e){
        this.isLicitacaoInput = e.target.checked;
    }

}