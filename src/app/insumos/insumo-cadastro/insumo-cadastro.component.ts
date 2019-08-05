import { Component, ResolvedReflectiveFactory, ɵConsole } from '@angular/core';
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
        let id = 0;
        this.activatedRouter.params.subscribe(parametro=>{
            id = parametro["id"];
        });

        this.title = 'NOVO INSUMO';
        this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE INSUMOS';
            
        if(id > 0){
            this.title = 'ALTERAR INSUMO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE INSUMOS';

            this.insumoService
                .getInsumo(id)
                .subscribe(res => {
                    this.formularioInsumos.setValue({
                        codigo:             res.codigo,
                        descricao:          res.descricao,
                        tipo:               TipoInsumo[res.tipoinsumo],
                        unidade:            res.unidademedida,
                        estado:             res.estado,
                        valornaodesonerado: res.valornaodesonerado,
                        valordesonerado:    res.valordesonerado,
                        observacao:         res.observacao
                    });
                });
        }
            
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
        const dadosFormulario = this.formularioInsumos.getRawValue();
        
        this.insumo.codigo              = dadosFormulario.codigo;
        this.insumo.descricao           = dadosFormulario.descricao;
        this.insumo.tipoinsumo          = TipoInsumo[dadosFormulario.tipo];
        this.insumo.unidademedida       = dadosFormulario.unidade;
        this.insumo.estado              = dadosFormulario.estado;
        this.insumo.valordesonerado     = dadosFormulario.valordesonerado;
        this.insumo.valornaodesonerado  = dadosFormulario.valornaodesonerado; 
        this.insumo.observacao          = dadosFormulario.observacao;

        // console.log(`Formulário: \n ${JSON.stringify(this.insumo)}`);
        // return;
        if (this.insumo.codigo > 0){
            //chama servico para atualizar insumo
            this.insumoService
                .updateInsumo(this.insumo)
                .subscribe(response => {
                    //pega retorno do servidor
                    let res:Response = <Response><unknown>response;
                    //se retorno 1 mostra mensagem de sucesso
                    if(res.codigo == 1){
                        alert(res.mensagem);
                        this.formularioInsumos.reset();
                        this.router.navigate(['/insumos']);
                        return;
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
                    this.router.navigate(['/insumos']);
                    return;
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
        if(valor == null){
            return;
        }
        this.valor = valor.length;
    }

    getValorNaoDesonerado(price: string){
        if(price == '')
            return;
        let valor = parseFloat(price.replace(',','.'));
        this.form.valornaodesonerado.setValue(this.getFormatPrice(valor));
    }

    getValorDesonerado(price: string){
        if(price == '')
            return;
        let valor = parseFloat(price.replace(',','.'));
        this.form.valordesonerado.setValue(this.getFormatPrice(valor));
    }

    getFormatPrice(price: number){
        return new Intl.NumberFormat('pt-BR',{minimumFractionDigits:2, maximumFractionDigits:2}).format(price);
    }

}