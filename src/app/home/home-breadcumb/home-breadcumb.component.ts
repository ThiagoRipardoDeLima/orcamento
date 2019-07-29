import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'breadcumb',
    templateUrl: './home-breadcumb.component.html',
    styleUrls: ['./home-breadcumb.component.css']
  })
  export class HomeBreadcumb{
    private rota: string;

    constructor(private route:ActivatedRoute){
        this.rota = this.route.routeConfig.path;
        //Primeira letra maiuscula
        
        this.rota = this.rota.charAt(0).toLocaleUpperCase() + this.rota.slice(1,this.rota.length).replace('/:id','');
    }



  }