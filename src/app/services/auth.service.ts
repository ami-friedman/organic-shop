import { AppUser } from './../models/app-user';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.user$ = afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) this.router.navigate([returnUrl]);
      }
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => this.userService.get(user.uid)));
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
