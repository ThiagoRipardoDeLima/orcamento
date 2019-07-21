import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService{

    constructor(private http: HttpClient){}

    getAll(){
        return this.http.get<User>(`/users`);
    }

}