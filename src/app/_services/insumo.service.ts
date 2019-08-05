import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Insumo } from '../_models/insumo';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class InsumoService{
    
    private baseUrlService:string = '';
    private options;
    constructor(private http:HttpClient){

        /** SETA URL DO SERVICO REST A SER ACESSADO */
        this.baseUrlService = `${environment.apiUrl}/insumos/`;

        /** ADICIONA JSON NO HEADER */
        this.options = {
            headers : new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'}) 
        }
    }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getInsumos(){
        return this.http.get<Insumo[]>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** CONSULTA UM USUARIO PELO CODIGO */
    getInsumo(codigo:number){
        return this.http.get<Insumo>(this.baseUrlService + codigo).pipe(map(res => {
            return res;
        }));
    }

    /** CONSULTA UM USUARIO PELA DESCRICAO */
    getInsumoByDescription(descricao:string){
        let param = 'description/' + descricao;
        return this.http.get<Insumo[]>(this.baseUrlService + param).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA UM USUARIO PELO TIPO INSUMO */
     getInsumoByType(type:string){
        let param = 'type/' + type;
        return this.http.get<Insumo[]>(this.baseUrlService + param).pipe(map(res => {
            return res;
        }));
    }

    /** ADICIONA UM NOVO USUARIO */
    addInsumo(insumo: Insumo){

        return this.http.post<Insumo>(this.baseUrlService, JSON.stringify(insumo), this.options)
                    .pipe(map(insumo => {
                        return insumo;
                    }));

    }

    /** EXCLUI UM USUARIO */
    deleteInsumo(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM USUARIO */
    updateInsumo(insumo: Insumo){
        return this.http.put(this.baseUrlService, JSON.stringify(insumo),this.options)
        .pipe(map(res => {
            return res;
        }));
    }
}