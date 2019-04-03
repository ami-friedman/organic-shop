import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService ) { }

  canActivate() {
    return this.authService.user$
    .pipe(switchMap( user => this.userService.get(user.uid)))
    .pipe(map( user => user.isAdmin));
  }
}
