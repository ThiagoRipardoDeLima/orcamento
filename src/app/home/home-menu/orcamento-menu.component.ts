import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento-menu',
  templateUrl: './orcamento-menu.component.html',
  styleUrls: ['./orcamento-menu.component.css']
})
export class OrcamentoMenuComponent implements OnInit {
  currentUser: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
