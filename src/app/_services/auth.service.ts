import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../_models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService{
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;
    public userTemp: User;

    public constructor(private http: HttpClient){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string){
        // return this.http.post<any>(`${environment.apiUrl}/user/auth`,{username,password})
        //     .pipe(map(user => {
        //         user.authdata = window.btoa(username + ':' + password);
        //         localStorage.setItem('currentUser',JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //         return user;
        //     }));
        
        this.userTemp = new User();
        this.userTemp.usunome = 'THIAGO RIPARDO'; 
        this.userTemp.authdata = window.btoa(username + ':' + password);

        localStorage.setItem('currentUser', JSON.stringify(this.userTemp));
        this.currentUserSubject.next(this.userTemp);
        return of(new HttpResponse({ status: 200, body:this.userTemp }));
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    // public getUser(): User{
    //     // this.userTemp.usucod; 1; 
    //     this.userTemp.usunome: 'thiago ripardo';
    //     this.userTemp.usuemail= 'thiago.ripardo.86@gmail.com';

    //     return this.userTemp;
    // }
    
}