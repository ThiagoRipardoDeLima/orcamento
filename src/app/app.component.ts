import { Component } from '@angular/core';
import { User } from './_models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

}
