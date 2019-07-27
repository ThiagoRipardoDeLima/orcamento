import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Insumo } from 'src/app/_models/insumo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InsumoService } from 'src/app/_services/insumo.service';
import { Response } from '../../_helper/response';


@Component({
    selector:'insumo-list',
    templateUrl:'insumo-list.component.html',
    styleUrls:['./insumo-list.component.css']
})
export class InsumoListComponent{
    private title = '';
    private subtitle = '';
    private insumos: Insumo[] = new Array();
    private formSearch: FormGroup;
    
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private insumoService: InsumoService){}

    ngOnInit(){
        this.title = 'INSUMOS';
        this.subtitle = 'LISTA DE INSUMOS';
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

    novoInsumo(){
        this.router.navigate(['/insumos/','']);
    }

    buscarInsumo(){
        //pega valores da busca
        let id          = this.f.id;
        let description = this.f.descricao;
        let type        = this.f.tipo;
        
        //limpa registros para nova busca
        this.insumos = null;

        //efetuamos a busca conforme o filtro preenchido
        if(id != 0){
            this.insumoService.getInsumo(id).subscribe(res => this.insumos.push(res));
            return
        }
        if(description != ''){
            this.insumoService.getInsumoByDescription(description).subscribe(res => this.insumos = res)
            return
        }
        if(type != ''){
            this.insumoService.getInsumoByType(type).subscribe(res => this.insumos = res);
            return
        }
        //nenhum filtro informado, busca todos
        this.insumoService.getInsumos().subscribe(res => this.insumos = res);

    }

    edita(id: number){
        this.router.navigate(['/insumos/',id]);
    }

    excluir(id:number, index:number){
        if(confirm("Deseja realmente excluir esse registro?")){
            //chama servico para excluir o registro
            this.insumoService.deleteInsumo(id).subscribe(response => {

                //Pega retorno do servico
                let res:Response = <Response>response;

                //1 = SUCESSO
                //mostra mensagem retornada e remove o registro da tabela
                if(res.codigo == 1){
                    alert(res.mensagem);
                    this.insumos.splice(index,1);
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