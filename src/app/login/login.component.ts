import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login()
    .then ( res => {
      this.router.navigate(['']);
    })
    .catch ( err => {
      console.log(err);
    });
  }

}
