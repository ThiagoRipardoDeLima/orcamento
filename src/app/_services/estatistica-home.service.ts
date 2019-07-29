import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { EstatisticasHome } from '../_models';

@Injectable({providedIn: 'root'})
export class EstatisticaHomeService{
    
    private baseUrlService:string = '';
    constructor(private http:HttpClient){

        /** SETA URL DO SERVICO REST A SER ACESSADO */
        this.baseUrlService = `${environment.apiUrl}/estatisticahome/`;

        /** ADICIONA JSON NO HEADER */
        // this.options =  new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getEstatisticas(){
        return this.http.get<EstatisticasHome>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

}