import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-orcamento-header',
  templateUrl: './orcamento-header.component.html',
  styleUrls: ['./orcamento-header.component.css']
})
export class OrcamentoHeaderComponent implements OnInit {
  usuarioLogado: User;

  constructor() { 
    this.usuarioLogado = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
