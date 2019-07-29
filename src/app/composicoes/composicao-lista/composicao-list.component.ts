import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from '../../_helper/response';
import { Composicao } from '../../_models/composicao'
import { ComposicaoService } from '../../_services/composicao.service';

@Component({
    selector:'composicao-list',
    templateUrl:'composicao-list.component.html',
    styleUrls:['./composicao-list.component.css']
})
export class ComposicaoListComponent{
    private title = '';
    private subtitle = '';
    private composicao: Composicao[] = new Array();
    private formSearch: FormGroup;
    
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private composicaoService: ComposicaoService){}

    ngOnInit(){
        this.title = 'COMPOSIÇÕES';
        this.subtitle = 'PESQUISA DE COMPOSIÇÕES';
        this.formInit();
    }

    get f(){return this.formSearch.value}

    formInit(){
        this.formSearch = this.formBuilder.group({
            id:[''],
            descricao:[''],
            tipo:['']
        });
    }

    buscar(){
        //pega valores da busca
        let id          = this.f.id;
        let description = this.f.descricao;
        let type        = this.f.tipo;
        
        //limpa registros para nova busca
        this.composicao = null;

        //efetuamos a busca conforme o filtro preenchido
        if(id != 0){
            this.composicaoService.getComposicao(id).subscribe(res => this.composicao.push(res));
            return
        }
        if(description != ''){
            this.composicaoService.getComposicaoByDescription(description).subscribe(res => this.composicao = res)
            return
        }
        if(type != ''){
            this.composicaoService.getComposicaoByType(type).subscribe(res => this.composicao = res);
            return
        }
        //nenhum filtro informado, busca todos
        this.composicaoService.getComposicoes().subscribe(res => this.composicao = res);

    }

    novo(){
        this.router.navigate(['/composicao/','']);
    }

    edita(id: number){
        this.router.navigate(['/composicao/',id]);
    }

    excluir(id:number, index:number){
        if(confirm("Deseja realmente excluir esse registro?")){
            //chama servico para excluir o registro
            this.composicaoService.deleteComposicao(id).subscribe(response => {

                //Pega retorno do servico
                let res:Response = <Response>response;

                //1 = SUCESSO
                //mostra mensagem retornada e remove o registro da tabela
                if(res.codigo == 1){
                    alert(res.mensagem);
                    this.composicao.splice(index,1);
                    return;
                }
                //0 = EXCEPTION GERADA NO SERVIDOR
                alert(res.mensagem);
            },
            (erro) => {
                //ERROS NAO TRATADOS
                alert(erro);
            })
        }
    }
}