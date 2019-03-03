import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.user = firebaseAuth.authState;
    this.user
    .subscribe(
      user => {
        if (user) {
          this.userDetails = user;
          console.log(user);
        } else {
          this.userDetails = null;
        }
      }
    );
    this.db.collection('users')
      .get()
      .subscribe(
        qs => {
          qs.forEach( doc => {
            console.log(doc.get('isAdmin'));
          });
        }
      );
  }

  login() {
    return this.firebaseAuth
    .auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  isLoggedIn() {
    if (this.userDetails) {
      return true;
    }
    return false;
  }

  get name() {
    return this.userDetails.displayName;
  }

  logout() {
    this.firebaseAuth.auth.signOut()
    .then( res => {
      this.router.navigate(['']);
    });
  }
}
