import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ComposicaoItem, Composicao, Insumo } from '../../_models';
import { ComposicaoItemService } from '../../_services/composicao-item.service';
import { TipoBanco, TipoItem, TipoInsumo, TipoComposicao } from '../../_helper/Enums';
import { Response }from '../../_helper/response';
import { InsumoService } from 'src/app/_services/insumo.service';
import { ComposicaoService } from 'src/app/_services/composicao.service';

@Component({
    selector:'composicao-cadastro-item',
    templateUrl:'composicao-cadastro-item.component.html',
    styleUrls:['./composicao-cadastro-item.component.css']
})
export class ComposicaoAddItemComponent{
    private title           = '';
    private subtitle        = '';
    private passos          = 'ETAPA 2/2';
    private isUpdate        = false;
    private isInsumo        = false;
    private isComposicao    = false;
    private idComposicao:number;
    private listaItensComposicao: ComposicaoItem[] = new Array();

    //modal
    private form: FormGroup;
    private composicaoModal: ComposicaoItem[] = new Array();
    private itemSelecionado: ComposicaoItem;
    private titleModal      = 'Pesquisar Composição';
    private tipoBanco       = TipoBanco;
    
    getTipoBanco(): Array<string>{
        var tipoBancoKey = Object.keys(TipoBanco);
        return tipoBancoKey.slice(0,tipoBancoKey.length/2);
    }
    isSelecionado = false;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private composicaoItemService: ComposicaoItemService,
                private insumoService: InsumoService,
                private composicaoService: ComposicaoService,
                private activatedRouter: ActivatedRoute){}

    ngOnInit(){
        this.idComposicao = 0;
        this.activatedRouter.params.subscribe(parametro=>{
            this.idComposicao = parametro["id"];
        })
        
        if(this.idComposicao === 0){
            this.router.navigate(["/composicao",this.idComposicao]);
        }

        //traz os itens da composicao
        this.composicaoItemService
            .getComposicoesItens(this.idComposicao)
            .subscribe(res => this.listaItensComposicao = res);
        
        this.title = 'NOVA COMPOSIÇÃO';
        this.subtitle = 'FORMULÁRIO DE CRIAÇÃO DE COMPOSIÇÃO';

        if(this.listaItensComposicao.length > 0){
            this.title = 'ALTERAR COMPOSIÇÃO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE COMPOSIÇÃO';
            this.isUpdate = true;
        }
            
        this.formInit();
    }

    get f(){return this.form.value}

    atualizaTitleModal(title: string, pesquisa: string){
        this.titleModal = title;
        this.isComposicao = false;
        this.isInsumo = false;
        this.limparFormularioPesquisa();

        if (pesquisa == 'C'){
            this.isComposicao = true; 
            return; 
        }
                    
        this.isInsumo = true;
    }

    formInit(){
    
        this.form = this.formBuilder.group({
            descricao:[''],
            codigo:[],
            tipobanco:[0],
            quantidade:[1]
        });
       
    }

    adicionarItem(){
        let quantidade = this.f.quantidade;

        //nao permite campo vazio
        if(quantidade === null){
            return;
        }

        //se ja foi adicionado na lista apenas atualiza
        this.listaItensComposicao.forEach(itens => {
            if(itens.coditem === this.itemSelecionado.coditem){
                itens.quantidade            = quantidade;
                itens.valordesonerado       *= quantidade;
                itens.valornaodesonerado    *= quantidade;
                this.f.quantidade           = 0;
            }
           
        })

        //nao permite adicionar caso ja exista na lista
        if(this.f.quantidade == 0){
            return;
        }

        //caso contrario, adiciona na lista
        this.itemSelecionado.quantidade            = this.f.quantidade;
        this.itemSelecionado.valordesonerado      *= this.f.quantidade;
        this.itemSelecionado.valornaodesonerado   *= this.f.quantidade;
        this.listaItensComposicao.push(this.itemSelecionado);
        this.limparFormularioPesquisa();
    }

    pesquisaItem(){
        this.composicaoModal = [];
        this.isSelecionado = false;
    
        // for(var i = 1; i < 10; i++){
        //     let itemComp = new ComposicaoItem();
        //     itemComp.codcomposicao = this.idComposicao;
        //     itemComp.coditem = i;
        //     itemComp.descricao = 'teste de cadastro ' + i;
        //     itemComp.unidade = 'M';
        //     itemComp.tipobanco = TipoBanco[TipoBanco.SINAPI];
        //     itemComp.tipoclasse = TipoInsumo[TipoInsumo.Equipamento];
        //     if(this.f.tipoBanco == TipoBanco.SINAPI){
        //         itemComp.tipoclasse = TipoComposicao[TipoComposicao.CANT];
        //     }
        //     itemComp.tipoitem = TipoItem[TipoItem.INSUMO];
            
        //     itemComp.valordesonerado = 10000
        //     itemComp.valornaodesonerado = 15
        //     this.composicaoModal.push(itemComp);
        // }
        // return; ///temporario
        let tipobanco = this.f.tipobanco;
        let codigo:number = this.f.codigo;
        let descricao:string = this.f.descricao.trim();

        if((codigo <= 0 || codigo === null) && descricao.length <= 0){
            return
        }

        if(codigo > 0){
            descricao = '';
        }

        if(descricao.length > 0){
            codigo = 0;
        }

        if(this.isComposicao){
           this.getComposicao(codigo,descricao,tipobanco);
           return;
        }

        this.getInsumo(codigo,descricao,tipobanco);
    }
    
    getInsumo(codigo:number,descricao:string,tipobanco:number){
        /////INSUMOS
        //SINAPI = 1
        let insumo:Insumo;
        let insumos:Insumo[];
        let compItem:ComposicaoItem;

        if(tipobanco){
             //IMPLEMENTAR SERVICOS
             //E FAZER A CHAMADA AQUI
             console.log(this.tipoBanco[tipobanco]);
             return;
        }
        
        if(codigo > 0){
            this.insumoService
                .getInsumo(codigo)
                .subscribe(res => { insumo = res});
            compItem.codcomposicao      = this.idComposicao;
            compItem.coditem            = insumo.codigo;
            compItem.descricao          = insumo.descricao;
            compItem.tipoitem           = TipoItem[TipoItem.INSUMO];
            compItem.tipobanco          = TipoBanco[TipoBanco.PRÓPRIO];
            compItem.maodeobra          = false;
            compItem.tipoclasse         = insumo.tipoinsumo;
            compItem.unidade            = insumo.unidademedida;
            compItem.valordesonerado    = insumo.valordesonerado;
            compItem.valornaodesonerado = insumo.valornaodesonerado;
            this.composicaoModal.push(compItem);
            return;
        }

        this.insumoService
            .getInsumoByDescription(descricao)
            .subscribe(res => { insumos = res });
            
        insumos.forEach( item => {
            compItem.codcomposicao      = this.idComposicao;
            compItem.coditem            = item.codigo;
            compItem.descricao          = item.descricao;
            compItem.tipoitem           = TipoItem[TipoItem.INSUMO];
            compItem.tipobanco          = TipoBanco[TipoBanco.PRÓPRIO];
            compItem.maodeobra          = false;
            compItem.tipoclasse         = item.tipoinsumo;
            compItem.unidade            = item.unidademedida;
            compItem.valordesonerado    = item.valordesonerado;
            compItem.valornaodesonerado = item.valornaodesonerado;
            this.composicaoModal.push(compItem);
        });
    }

    getComposicao(codigo:number, descricao:string, tipobanco:number){
        let composicao:Composicao;
        let composicoes:Composicao[];
        let compItem:ComposicaoItem;


        if(tipobanco){
            //SINAPI = 1
            //IMPLEMENTAR SERVICOS
            console.log(this.tipoBanco[tipobanco]);
            return;
        }
        //COMPOSICAO PROPRIA = 0
        if(codigo > 0){
            this.composicaoService.getComposicao(codigo).subscribe( res => { composicao = res });
            
            compItem.codcomposicao      = this.idComposicao;
            compItem.tipobanco          = TipoBanco[TipoBanco.PRÓPRIO];
            compItem.tipoitem           = TipoItem[TipoItem.COMPOSIÇÃO];
        
            compItem.coditem            = composicao.codigo;
            compItem.descricao          = composicao.descricao;
            compItem.tipoclasse         = composicao.tipocomposicao;
            compItem.unidade            = composicao.unidademedida;
            compItem.valordesonerado    = composicao.valordesonerado;
            compItem.valornaodesonerado = composicao.valornaodesonerado;
            this.composicaoModal.push(compItem);
            return;
        }
        this.composicaoService.getComposicaoByDescription(descricao).subscribe(res => composicoes = res);
        composicoes.forEach(item => {
            compItem.codcomposicao      = this.idComposicao;
            compItem.tipobanco          = TipoBanco[TipoBanco.PRÓPRIO];
            compItem.tipoitem           = TipoItem[TipoItem.COMPOSIÇÃO];
        
            compItem.coditem            = item.codigo;
            compItem.descricao          = item.descricao;
            compItem.tipoclasse         = item.tipocomposicao;
            compItem.unidade            = item.unidademedida;
            compItem.valordesonerado    = item.valordesonerado;
            compItem.valornaodesonerado = item.valornaodesonerado;
            this.composicaoModal.push(compItem);
        });
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

    cancelar(){
        if(confirm("Deseja realmente sair sem finalizar o cadastro?")){
            this.router.navigate(['/composicoes']);
        }
    }

    finalizarCadastro(){
        if(confirm("Deseja finalizar o cadastro e gravar as informações")){
            //se nao houver items na lista, somente retorna para a tela de consulta!!!
            if(this.listaItensComposicao.length == 0){
                if(confirm("A composição esta vazia! Deseja finalizar mesmo assim?")){
                    this.router.navigate(['composicoes']);
                }
                return;
            }

            if (this.isUpdate){
                this.composicaoItemService
                    .updateComposicaoItem(this.listaItensComposicao)
                    .subscribe(response => {
                        //pega retorno do servidor
                        let res:Response = <Response><unknown>response;
                        //se retorno 1 mostra mensagem de sucesso
                        if(res.codigo == 1){
                            alert(res.mensagem);
                            this.router.navigate(['/composicoes'])
                        }
                        //caso ocorra alguma exceção no servidor
                        alert(res.mensagem);
                    },
                    error => {
                        alert('Não foi possível finalizar o cadastro. Contate o administrador do sistema e informe o código(' + error.status + ' - ' + error.statusText + ').');
                    }
                );
            }else{
                this.composicaoItemService
                    .addComposicaoItem(this.listaItensComposicao)
                    .subscribe(response => {
                        //pega retorno do servidor
                        let res:Response = <Response><unknown>response;
                        //se retorno 1 mostra mensagem de sucesso
                        if(res.codigo == 1){
                            alert(res.mensagem);
                            this.router.navigate(['/composicoes'])
                        }
                        //caso ocorra alguma exceção no servidor
                        alert(res.mensagem);
                    },
                    error => {
                        alert('Não foi possível finalizar o cadastro. Contate o administrador do sistema e informe o código(' + error.status + ' - ' + error.statusText + ').');
                    }
                );
            }
           
        }
    }

}