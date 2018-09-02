import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

  userSecret;

  constructor() { }

  setUserSecret(token) {
    this.userSecret = token;
    localStorage.setItem('userSecret', token);
  }

  getUserSecret() {
    return this.userSecret.toString();
  }

}
