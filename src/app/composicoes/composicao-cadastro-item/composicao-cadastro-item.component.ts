import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ComposicaoItem, Composicao } from '../../_models';
import { ComposicaoItemService } from '../../_services/composicao-item.service';
import { TipoBanco, TipoItem, TipoInsumo, TipoComposicao } from '../../_helper/Enums';


@Component({
    selector:'composicao-cadastro-item',
    templateUrl:'composicao-cadastro-item.component.html',
    styleUrls:['./composicao-cadastro-item.component.css']
})
export class ComposicaoAddItemComponent{
    private title = '';
    private subtitle = '';
    private passos = 'ETAPA 2/2';
    
    private listaItensComposicao: ComposicaoItem[] = new Array();

    //modal
    private form: FormGroup;
    private composicaoModal: ComposicaoItem[] = new Array();
    private itemSelecionado: ComposicaoItem;
    private titleModal = 'Pesquisar Composição';
    private tipoBanco = TipoBanco;
    getTipoBanco(): Array<string>{
        var tipoBancoKey = Object.keys(TipoBanco);
        return tipoBancoKey.slice(0,tipoBancoKey.length/2);
    }
    isSelecionado = false;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private composicaoItemService: ComposicaoItemService,
                private activatedRouter: ActivatedRoute){}

    ngOnInit(){
        let id = 0;
        this.activatedRouter.params.subscribe(parametro=>{
            id = parametro["id"];
        })
        
        if(id === 0){
            // this.router.navigate(["/composicao",id]);
        }

        // this.composicaoItemService.getComposicoesItens(id).subscribe(res => this.composicaoItem = res);
        
        this.title = 'NOVA COMPOSIÇÃO';
        this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE COMPOSIÇÃO';

        if(this.listaItensComposicao.length > 0){
            this.title = 'ALTERAR COMPOSIÇÃO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE COMPOSIÇÃO';
        }
            
        this.formInit();
    }

    get f(){return this.form.value}

    formInit(){
    
        this.form = this.formBuilder.group({
            descricao:[''],
            codigo:[],
            tipobanco:[0],
            quantidade:[1]
        });
       
    }

    adicionarItem(){
        this.listaItensComposicao.forEach(itens => {
            if(itens.coditem === this.itemSelecionado.coditem){
                console.log('Item: ' + itens.coditem);
                itens.quantidade = this.f.quantidade;
                itens.valordesonerado *= this.f.quantidade;
                itens.valornaodesonerado *= this.f.quantidade;
                this.f.quantidade = 0;
            }
           
        })

        if(this.f.quantidade == 0){
            return;
        }

        this.itemSelecionado.quantidade = this.f.quantidade;
        this.itemSelecionado.valordesonerado *= this.f.quantidade;
        this.itemSelecionado.valornaodesonerado *= this.f.quantidade;
        this.listaItensComposicao.push(this.itemSelecionado);
        this.limparFormularioPesquisa();
    }

    pesquisaItem(){
        this.composicaoModal = [];
        this.isSelecionado = false;
        for(var i = 1; i < 10; i++){
            let itemComp = new ComposicaoItem();
            itemComp.coditem = i;
            itemComp.descricao = 'teste de cadastro ' + i;
            itemComp.unidade = 'M';
            itemComp.tipobanco = TipoBanco[TipoBanco.SINAPI];
            itemComp.tipoclasse = TipoInsumo[TipoInsumo.Equipamento];
            if(this.f.tipoBanco == TipoBanco.SINAPI){
                itemComp.tipoclasse = TipoComposicao[TipoComposicao.CANT];
            }
            itemComp.tipoitem = TipoItem[TipoItem.INSUMO];
            
            itemComp.valordesonerado = 10000
            itemComp.valornaodesonerado = 15
            this.composicaoModal.push(itemComp);
        }

    }

    selecionarItem(item: ComposicaoItem){
        this.isSelecionado = true;
        this.itemSelecionado = this.composicaoModal[this.composicaoModal.indexOf(item)]; 
    }

    limparFormularioPesquisa(){
        this.formInit();
        this.f.codigo = null,
        this.f.descricao = null,
        this.itemSelecionado = new ComposicaoItem();
    }
    
    editar(index: number){
        this.itemSelecionado = this.listaItensComposicao[index];
        console.log(this.itemSelecionado);
        this.isSelecionado = true;
    }

    excluir(id:number, index:number){
        if(confirm("Deseja realmente excluir esse registro?")){
            this.listaItensComposicao.splice(index,1);
        }
    }

}