import { AppUser } from './../models/app-user';
import { AdminAuthGuard } from './../services/admin-auth-guard.service';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent {
  appUser: AppUser;

  constructor(public authService: AuthService, public adminGuard: AdminAuthGuard) {
    this.authService.appUser$.subscribe( user => this.appUser = user);
  }

  logout() {
    this.authService.logout();
  }
}
