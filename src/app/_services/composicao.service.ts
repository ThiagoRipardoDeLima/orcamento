import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Composicao } from '../_models/composicao';

@Injectable({providedIn: 'root'})
export class ComposicaoService{
    
    private baseUrlService:string = '';
    private options;
    constructor(private http:HttpClient){

        /** SETA URL DO SERVICO REST A SER ACESSADO */
        this.baseUrlService = `${environment.apiUrl}/composicao/`;

        /** ADICIONA JSON NO HEADER */
        this.options =  new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getComposicoes(){
        return this.http.get<Composicao[]>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** CONSULTA UM USUARIO PELO CODIGO */
    getComposicao(codigo:number){
        return this.http.get<Composicao>(this.baseUrlService + codigo).pipe(map(res => {
            return res;
        }));
    }

    /** CONSULTA UM USUARIO PELA DESCRICAO */
    getComposicaoByDescription(descricao:string){
        return this.http.get<Composicao[]>(this.baseUrlService + descricao).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA UM USUARIO PELO TIPO INSUMO */
     getComposicaoByType(type:string){
        return this.http.get<Composicao[]>(this.baseUrlService + type).pipe(map(res => {
            return res;
        }));
    }

    /** ADICIONA UM NOVO USUARIO */
    addComposicao(composicao: Composicao){

        return this.http.post<any>(this.baseUrlService, JSON.stringify(composicao), this.options)
                    .pipe(map(composicao => {
                        return composicao;
                    }));

    }

    /** EXCLUI UM USUARIO */
    deleteComposicao(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM USUARIO */
    updateComposicao(composicao: Composicao){
        return this.http.put(this.baseUrlService, JSON.stringify(composicao),this.options)
        .pipe(map(res => {
            return res
        }));
    }
}