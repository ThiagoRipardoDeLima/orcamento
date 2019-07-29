import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { ComposicaoItem } from '../_models/composicao-item';

@Injectable({providedIn: 'root'})
export class ComposicaoItemService{
    
    private baseUrlService:string = '';
    private options;
    constructor(private http:HttpClient){

        /** SETA URL DO SERVICO REST A SER ACESSADO */
        this.baseUrlService = `${environment.apiUrl}/composicao-item/`;

        /** ADICIONA JSON NO HEADER */
        this.options =  new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    }

    /** CONSULTA TODOS OS ITENS CADASTRADO NA COMPOSICAO */
    getComposicoesItens(codigo: number){
        return this.http.get<ComposicaoItem[]>(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    // /** CONSULTA UM ITEM DA COMPOSICAO PELO CODIGO */
    // getComposicaoItem(codigo:number){
    //     return this.http.get<ComposicaoItem>(this.baseUrlService + codigo).pipe(map(res => {
    //         return res;
    //     }));
    // }


    /** ADICIONA UMA NOVO ITEM A COMPOSICAO */
    addComposicaoItem(composicaoItem: ComposicaoItem){

        return this.http.post<any>(this.baseUrlService, JSON.stringify(composicaoItem), this.options)
                    .pipe(map(res => {
                        return res;
                    }));

    }

    /** EXCLUI UM USUARIO */
    deleteComposicaoItem(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM USUARIO */
    updateComposicao(composicaoItem: ComposicaoItem){
        return this.http.put(this.baseUrlService, JSON.stringify(composicaoItem),this.options)
        .pipe(map(res => {
            return res
        }));
    }
}