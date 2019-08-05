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
        this.options = {
            headers : new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
        }
    }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getOrcamentos(){
        return this.http.get<Orcamento[]>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** CONSULTA UM ORCAMENTO PELO CODIGO */
    getOrcamento(codigo:number){
        return this.http.get<Orcamento>(this.baseUrlService + codigo).pipe(map(res => {
            return res;
        }));
    }

    /** CONSULTA UM ORCAMENTO PELA DESCRICAO */
    getOrcamentoByDescription(descricao:string){
        let param = 'description/' + descricao
        return this.http.get<Orcamento[]>(this.baseUrlService + param).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA UM ORCAMENTO PELO CLIENTE */
    getOrcamentoByClient(cliente:string){
        let param = 'cliente/' + cliente
        return this.http.get<Orcamento[]>(this.baseUrlService + param).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA O ID DO ULTIMO ORCAMENTO GRAVADO */
     getOrcamentoByLastId(){
        return this.http
                    .get<any>(this.baseUrlService+'/id')
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ADICIONA UM NOVO ORCAMENTO */
    addOrcamento(orcamento: Orcamento){
        return this.http.post<any>(this.baseUrlService, JSON.stringify(orcamento), this.options)
                    .pipe(map(orca => {
                        return orca;
                    }));

    }

    /** EXCLUI UM ORCAMENTO */
    deleteOrcamento(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM ORCAMENTO */
    updateOrcamento(orcamento: Orcamento){
        return this.http.put(this.baseUrlService, JSON.stringify(orcamento),this.options)
        .pipe(map(res => {
            return res
        }));
    }
}