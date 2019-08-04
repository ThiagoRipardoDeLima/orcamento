import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService{
    
    private baseUrlService:string = '';
    private options;

    constructor(private http:HttpClient){

        /** SETA URL DO SERVICO REST A SER ACESSADO */
        this.baseUrlService = `${environment.apiUrl}/users/`;
    
        /** ADICIONA JSON NO HEADER */
        this.options = {
            headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'}) 
        };
    }

    /** CONSULTA TODOS OS USUARIOS CADASTRADOS */
    getUsuarios(){
        return this.http.get<User[]>(this.baseUrlService)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** CONSULTA UM USUARIO PELO CODIGO */
    getUsuario(codigo:number){
        return this.http.get<User>(this.baseUrlService + codigo).pipe(map(res => {
            return res;
        }));
    }

    /** CONSULTA UM USUARIO PELA DESCRICAO */
    getUsuarioByName(descricao:string){
        let params = 'name/' + descricao;
        return this.http.get<User[]>(this.baseUrlService + params).pipe(map(res => {
            return res;
        }));
    }

     /** CONSULTA UM USUARIO PELO LOGIN */
     getUsuarioByLogin(login:string){
        let params = 'login/' + login;
        return this.http.get<User[]>(this.baseUrlService + params).pipe(map(res => {
            return res;
        }));
    }

    /** ADICIONA UM NOVO USUARIO */
    addUsuario(usuario: User){

        return this.http.post<any>(this.baseUrlService, JSON.stringify(usuario), this.options)
                    .pipe(map(res => {
                        return res;
                    }));

    }

    /** EXCLUI UM USUARIO */
    deleteUsuario(codigo:number){
        return this.http.delete(this.baseUrlService + codigo)
                    .pipe(map(res => {
                        return res;
                    }));
    }

    /** ATUALIZA INFORMAÇÕES DE UM USUARIO */
    updateUsuario(usuario: User){
        return this.http.put(this.baseUrlService, JSON.stringify(usuario),this.options)
        .pipe(map(res => {
            return res
        }));
    }
}