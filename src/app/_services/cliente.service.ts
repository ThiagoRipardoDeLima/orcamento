import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Cliente } from '../_models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrlService:string = '';
  private options;
  
  constructor(private http:HttpClient){

    /** SETA URL DO SERVICO REST A SER ACESSADO */
    this.baseUrlService = `${environment.apiUrl}/cliente/`;

    /** ADICIONA JSON NO HEADER */
    this.options = {
        headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    }; 
  }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getClientes(){
        return this.http.get<Cliente[]>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** CONSULTA UM USUARIO PELO CODIGO */
    getCliente(codigo:number){
        return this.http.get<Cliente>(this.baseUrlService + codigo).pipe(map(res => {
            return res;
        }));
    }

    /** CONSULTA UM USUARIO PELA DESCRICAO */
    getClienteByNome(descricao:string){
        return this.http.get<Cliente[]>(this.baseUrlService + descricao).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA UM USUARIO PELO TIPO INSUMO */
    getClienteByCPF(cpf:string){
        return this.http.get<Cliente[]>(this.baseUrlService + cpf).pipe(map(res => {
            return res;
        }));
    }

    /** ADICIONA UM NOVO USUARIO */
    addCliente(cliente: Cliente){

        return this.http.post<any>(this.baseUrlService, JSON.stringify(cliente), this.options)
                    .pipe(map(res => {
                        return res;
                    }));

    }

    /** EXCLUI UM USUARIO */
    deleteCliente(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM USUARIO */
    updateCliente(cliente: Cliente){
        return this.http.put(this.baseUrlService, JSON.stringify(cliente),this.options)
        .pipe(map(res => {
            return res
        }));
    }
}
