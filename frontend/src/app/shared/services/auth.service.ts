import { Router } from '@angular/router';
import { UserLoginAction, UserLogoutAction, UserAuthAction, UserLoginSuccessAction } from './../../store/actions/user.action';
import { USER_ACTION_TYPES } from './../../store/actions/user.action';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';

import { State } from './../../store/index';

@Injectable()
export class AuthService {

  private _user: firebase.User;
  loggedIn = false;

  constructor(public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public store: Store<State>,
    private router: Router) {
    afAuth.authState.subscribe((user) => {
      this.setUser(user);
    });
  }

  setLoggedIn() {
    this.loggedIn = true;
  }

  removeLoggedIn() {
    this.loggedIn = false;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  setUser(user) {
    if (user !== null) {
      this.store.dispatch(new UserAuthAction({
        username: user.displayName,
        user_image: user.photoURL,
        uid: user.uid,
      }));
      this.store.dispatch(new UserLoginSuccessAction({
        uid: user.uid,
      }));
      this.router.navigate(['/']);
    } else {
      this.store.dispatch(new UserLogoutAction({}));
    }
  }

  signInWithGoogle(): void {
    this.store.dispatch(new UserLoginAction({}));
  }

  signOut(): void {
    this.store.dispatch(new UserLogoutAction({}));
  }
}
