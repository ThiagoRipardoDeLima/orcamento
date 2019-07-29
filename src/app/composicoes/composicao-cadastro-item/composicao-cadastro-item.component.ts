import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComposicaoItem } from 'src/app/_models';
import { ComposicaoItemService } from 'src/app/_services/composicao-item.service';
import { TipoBanco } from 'src/app/_helper/Enums';

@Component({
    selector:'composicao-cadastro-item',
    templateUrl:'composicao-cadastro-item.component.html',
    styleUrls:['./composicao-cadastro-item.component.css']
})
export class ComposicaoAddItemComponent{
    private title = '';
    private subtitle = '';
    private passos = 'ETAPA 2/2';
    
    private composicaoItem: ComposicaoItem[] = new Array();
    private formSearch: FormGroup;
    
    //modal
    private modalDisplay;
    private modalClass;
    private titleModal;
    private tipoBanco = TipoBanco;
    getTipoBanco(): Array<string>{
        var tipoBancoKey = Object.keys(TipoBanco);
        return tipoBancoKey.slice(0,tipoBancoKey.length/2);
    }


    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private composicaoItemService: ComposicaoItemService,
                private activatedRouter: ActivatedRoute){}

    ngOnInit(){
        console.log(this.tipoBanco);
        console.log(this.getTipoBanco());
        this.modalClass = true;
        this.modalDisplay = 'none';
    
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

        if(this.composicaoItem.length > 0){
            this.title = 'ALTERAR COMPOSIÇÃO';
            this.subtitle = 'FORMULÁRIO DE ALTERAÇÃO DE COMPOSIÇÃO';
        }
            
       
        let item = new ComposicaoItem();
        item.codigoitem = 1;
        item.tipobanco = TipoBanco[TipoBanco.SINAPI];
        this.composicaoItem.push(item);
        this.composicaoItem.push(item);
        this.composicaoItem.push(item);

        // this.formInit();
    }

    teste(codigo: number, index: number){
        alert('Param.: ' + codigo + ' - ' + index);
    }

    // get f(){return this.formSearch.value}

    // formInit(){
    //     this.formSearch = this.formBuilder.group({
    //         id:[''],
    //         descricao:[''],
    //         tipo:['']
    //     });
    // }

    // buscar(){
    //     //pega valores da busca
    //     let id          = this.f.id;
    //     let description = this.f.descricao;
    //     let type        = this.f.tipo;
        
    //     //limpa registros para nova busca
    //     this.composicao = null;

    //     //efetuamos a busca conforme o filtro preenchido
    //     if(id != 0){
    //         this.composicaoItemService.getComposicao(id).subscribe(res => this.composicao.push(res));
    //         return
    //     }
    //     if(description != ''){
    //         this.composicaoItemService.getComposicaoByDescription(description).subscribe(res => this.composicao = res)
    //         return
    //     }
    //     if(type != ''){
    //         this.composicaoItemService.getComposicaoByType(type).subscribe(res => this.composicao = res);
    //         return
    //     }
    //     //nenhum filtro informado, busca todos
    //     this.composicaoItemService.getComposicoes().subscribe(res => this.composicao = res);

    // }

    novo(){
        // this.router.navigate(['/composicao/','']);

        let item = new ComposicaoItem();
        item.codigoitem = 1;
        item.tipobanco = TipoBanco[TipoBanco.SINAPI];
        this.composicaoItem.push(item);
        this.modalDisplay = 'none';
        this.modalClass=true;

    }

    // edita(id: number){
    //     this.router.navigate(['/composicao/',id]);
    // }

    // excluir(id:number, index:number){
    //     if(confirm("Deseja realmente excluir esse registro?")){
    //         //chama servico para excluir o registro
    //         this.composicaoItemService.deleteComposicao(id).subscribe(response => {

    //             //Pega retorno do servico
    //             let res:Response = <Response>response;

    //             //1 = SUCESSO
    //             //mostra mensagem retornada e remove o registro da tabela
    //             if(res.codigo == 1){
    //                 alert(res.mensagem);
    //                 this.composicao.splice(index,1);
    //                 return;
    //             }
    //             //0 = EXCEPTION GERADA NO SERVIDOR
    //             alert(res.mensagem);
    //         },
    //         (erro) => {
    //             //ERROS NAO TRATADOS
    //             alert(erro);
    //         })
    //     }
    // }
}