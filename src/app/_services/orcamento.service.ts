import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Orcamento } from '../_models/orcamento';

@Injectable({providedIn: 'root'})
export class OrcamentoService{
    
    private baseUrlService:string = '';
    private options;
    constructor(private http:HttpClient){

        /** SETA URL DO SERVICO REST A SER ACESSADO */
        this.baseUrlService = `${environment.apiUrl}/orcamento/`;

        /** ADICIONA JSON NO HEADER */
        this.options =  new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getOrcamentos(){
        return this.http.get<Orcamento[]>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** CONSULTA UM USUARIO PELO CODIGO */
    getOrcamento(codigo:number){
        return this.http.get<Orcamento>(this.baseUrlService + codigo).pipe(map(res => {
            return res;
        }));
    }

    /** CONSULTA UM USUARIO PELA DESCRICAO */
    getOrcamentoByDescription(descricao:string){
        return this.http.get<Orcamento[]>(this.baseUrlService + descricao).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA UM USUARIO PELO TIPO INSUMO */
    getOrcamentoByClient(type:string){
        return this.http.get<Orcamento[]>(this.baseUrlService + type).pipe(map(res => {
            return res;
        }));
    }

    /** ADICIONA UM NOVO USUARIO */
    addOrcamento(orcamento: Orcamento){
        return this.http.post<any>(this.baseUrlService, JSON.stringify(orcamento), this.options)
                    .pipe(map(orca => {
                        return orca;
                    }));

    }

    /** EXCLUI UM USUARIO */
    deleteOrcamento(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM USUARIO */
    updateOrcamento(orcamento: Orcamento){
        return this.http.put(this.baseUrlService, JSON.stringify(orcamento),this.options)
        .pipe(map(res => {
            return res
        }));
    }
}