import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Estados, TipoInsumo } from '../../_helper/Enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Insumo } from 'src/app/_models/insumo';
import { InsumoService } from '../../_services/insumo.service';
import { Response } from '../../_helper/response';

@Component({
    selector:'insumo-cadastro',
    templateUrl:'./insumo-cadastro.component.html',
    styleUrls:['./insumo-cadastro.component.css']
})

export class InsumoAddComponent{
    private title = '';
    private subtitle = '';
    private insumo:Insumo = new Insumo();
    private submitted = false;
    
    /* PARA CARREGAR COMBOS*/
    private estadosKeys = Object.keys(Estados);
    private estadosValue = Estados;

    private tipoKeys = TipoInsumo;
    getTipoKeys() : Array<string>{
        var keys = Object.keys(this.tipoKeys);
        return keys.slice(keys.length/2); 
    }
    /*****/

    private formularioInsumos: FormGroup;
    private textarealength = 500;
    private valor = 0;
    
    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRouter: ActivatedRoute,
                private insumoService: InsumoService){}

    ngOnInit(){
        this.activatedRouter.params.subscribe(parametro=>{
            if(parametro["id"] > 0){
                this.insumoService.getInsumo(parametro['id']).subscribe(res => this.insumo = res);
            }
            if(this.insumo.codigo > 0){
                this.title = 'ALTERAR INSUMO';
                this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE INSUMOS';
            }else{
                this.title = 'NOVO INSUMO';
                this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE INSUMOS';
            }
        })
        this.criarFormularioDeInsumos(this.insumo);
    }

    get form(){return this.formularioInsumos.controls};

    criarFormularioDeInsumos(insumo: Insumo){
        this.formularioInsumos = this.formBuilder.group({
            codigo: new FormControl({value:insumo.codigo ,disabled:true},[Validators.required]),
            descricao:[insumo.descricao, Validators.required],
            tipo:[insumo.tipoinsumo],
            unidade:[insumo.unidademedida],
            estado:[insumo.estado],
            valornaodesonerado:[insumo.valornaodesonerado],
            valordesonerado:[insumo.valordesonerado],
            observacao:[insumo.observacao, Validators.maxLength(500)]
        })
    }


    salvar(){
        this.submitted = true;
        if(!this.formularioInsumos.valid){
            return;
        }   
        const dadosFormulario = this.formularioInsumos.value;
        
        this.insumo.descricao           = dadosFormulario.descricao;
        this.insumo.tipoinsumo          = dadosFormulario.tipo;
        this.insumo.unidademedida       = dadosFormulario.unidade;
        this.insumo.estado              = dadosFormulario.estado;
        this.insumo.valordesonerado     = dadosFormulario.valordesonerado;
        this.insumo.valornaodesonerado  = dadosFormulario.valornaodesonerado; 
        this.insumo.observacao          = dadosFormulario.observacao;

        // alert(`Formulário: \n ${JSON.stringify(this.insumo)}`);
        if (this.insumo.codigo > 0){
            //chama servico para atualizar insumo
            this.insumoService
                .addInsumo(this.insumo)
                .subscribe(response => {
                    //pega retorno do servidor
                    let res:Response = <Response><unknown>response;
                    //se retorno 1 mostra mensagem de sucesso
                    if(res.codigo == 1){
                        alert(res.mensagem);
                        this.formularioInsumos.reset();
                        this.router.navigate(['/home'])
                    }
                    //caso ocorra alguma exceção no servidor
                    alert(res.mensagem);
                });
        }else{
            //se codigo = 0, insere novo registro
            this.insumoService
            .addInsumo(this.insumo)
            .subscribe(response => {
                //pega retorno do servidor
                let res:Response = <Response><unknown>response;
                //se retorno 1 mostra mensagem de sucesso
                if (res.codigo == 1){
                    alert(res.mensagem);
                    this.formularioInsumos.reset();
                    this.router.navigate(['/home']);
                }
                alert(res.mensagem);
            })
        }
        
        
    }

    cancelar(e: Event){
        // console.log('Click ' + e);
        this.formularioInsumos.reset();
        this.router.navigate(['/insumos']);
    }

    contador(){
        let valor = this.form.observacao.value;
        this.valor = valor.length;
    }

    getValorNaoDesonerado(price: string){
        let valor = parseFloat(price.replace(',','.'));
        this.form.valornaodesonerado.setValue(this.getFormatPrice(valor));
    }

    getValorDesonerado(price: string){
        let valor = parseFloat(price.replace(',','.'));
        this.form.valordesonerado.setValue(this.getFormatPrice(valor));
    }

    getFormatPrice(price: number){
        return new Intl.NumberFormat('pt-BR',{minimumFractionDigits:2, maximumFractionDigits:2}).format(price);
    }

}