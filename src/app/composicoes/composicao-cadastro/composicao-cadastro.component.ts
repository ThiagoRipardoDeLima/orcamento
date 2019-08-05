import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Estados, TipoComposicao } from '../../_helper/Enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '../../_helper/response';
import { Composicao } from '../../_models/composicao';
import { ComposicaoService } from 'src/app/_services/composicao.service';

@Component({
    selector:'composicao-cadastro',
    templateUrl:'./composicao-cadastro.component.html',
    styleUrls:['./composicao-cadastro.component.css']
})

export class ComposicaoAddComponent{
    private title = '';
    private subtitle = '';
    private passos = 'ETAPA 1/2';
    private composicao:Composicao = new Composicao();
    private submitted = false;
    
    /* PARA CARREGAR COMBOS*/
    private estadosKeys = Object.keys(Estados);
    private estadosValue = Estados;

    private tipoKeys = TipoComposicao;
    getTipoKeys() : Array<string>{
        var keys = Object.keys(this.tipoKeys);
        return keys.slice(keys.length/2); 
    }
    /*****/

    private formulario: FormGroup;
    private textarealength = 500;
    private valor = 0;
    
    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRouter: ActivatedRoute,
                private composicaoService: ComposicaoService){}

    ngOnInit(){
        let id = 0;
        this.activatedRouter.params.subscribe(parametro=>{
            id = parametro["id"];   
        });  

        this.title = 'NOVA COMPOSIÇÃO';
        this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE COMPOSIÇÃO';
            
        if(id>0){
            this.title = 'ALTERAR COMPOSIÇÃO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE COMPOSIÇÃO';

            this.composicaoService
                .getComposicao(id)
                .subscribe(res => {
                    this.formulario.setValue({
                        codigo:     res.codigo,
                        descricao:  res.descricao,
                        tipo:       res.tipocomposicao,
                        unidade:    res.unidademedida,
                        maodeobra:  res.maodeobra,
                        estado:     res.estado,
                        observacao: res.observacao
                    });
                });
        }
                
        this.criarFormulario(this.composicao);
    }

    get form(){return this.formulario.controls};

    criarFormulario(composicao: Composicao){
        this.formulario = this.formBuilder.group({
            codigo: new FormControl({value:composicao.codigo ,disabled:true},[Validators.required]),
            descricao:[composicao.descricao, Validators.required],
            tipo:[composicao.tipocomposicao, Validators.required],
            unidade:[composicao.unidademedida, Validators.required],
            maodeobra:[composicao.maodeobra],
            estado:[composicao.estado, Validators.required],
            // valornaodesonerado:[composicao.valornaodesonerado],
            // valordesonerado:[composicao.valordesonerado],
            observacao:[composicao.observacao, Validators.maxLength(500)]
        })
    }

    salvar(){
        this.submitted = true;
        if(!this.formulario.valid){
            return;
        }   
        const dadosFormulario = this.formulario.getRawValue();
        
        this.composicao.codigo              = dadosFormulario.codigo;
        this.composicao.descricao           = dadosFormulario.descricao;
        this.composicao.tipocomposicao      = TipoComposicao[dadosFormulario.tipo];
        this.composicao.maodeobra           = dadosFormulario.maodeobra;
        this.composicao.unidademedida       = dadosFormulario.unidade;
        this.composicao.estado              = dadosFormulario.estado;
        // this.composicao.valordesonerado     = dadosFormulario.valordesonerado;
        // this.composicao.valornaodesonerado  = dadosFormulario.valornaodesonerado; 
        this.composicao.observacao          = dadosFormulario.observacao;
        this.composicao.criadoem            = new Date();

        // alert(`Formulário: \n ${JSON.stringify(this.composicao)}`);
        if (this.composicao.codigo > 0){
            //chama servico para atualizar composicao
            this.composicaoService
                .updateComposicao(this.composicao)
                .subscribe(response => {
                    //pega retorno do servidor
                    let res:Response = <Response><unknown>response;
                    //se retorno 1 mostra mensagem de sucesso
                    if(res.codigo == 1){
                        alert(res.mensagem);
                        this.formulario.reset();
                        this.router.navigate(['/composicao/item/',this.composicao.codigo]);
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
            this.composicaoService
            .addComposicao(this.composicao)
            .subscribe(response => {
                //pega retorno do servidor
                let res:Response = <Response><unknown>response;
                //se retorno 1 mostra mensagem de sucesso
                if (res.codigo == 1){
                    this.composicaoService
                        .getComposicaoByLastId()
                        .subscribe(response => {
                            let res:Response = <Response><unknown>response;
                            this.formulario.reset();
                            this.router.navigate(['/composicao/item/',res.codigo]);
                            return;
                        });
                }
                alert(res.mensagem);
            },
            error => {
                alert('Serviço indisponível no momento. Contate o administrador do sistema e informe o código(' + error.status + ' - ' + error.statusText + ').');
            });
        }
    }

    cancelar(e: Event){
        // console.log('Click ' + e);
        this.formulario.reset();
        this.router.navigate(['/composicoes']);
    }

    contador(){
        let valor = this.form.observacao.value;
        if (valor != null)
            this.valor = valor.length;
    }

    getLastId():number{
        let id = 0;
        this.composicaoService
        .getComposicaoByLastId()
        .subscribe(response => {
            let res:Response = <Response><unknown>response;
            alert(res.codigo);
            
            id = res.codigo;
        });
        alert("ID = " + id);
        return id;
    }

}