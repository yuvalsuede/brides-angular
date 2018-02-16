import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {StorageService} from './storage.service';
import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/filter';

export interface TOKEN {
  accessToken: string;
  idToken: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'AvdNt5Ya1svn2dIngC4lTMWL11noj1By',
    domain: 'brides.auth0.com',
    responseType: 'token id_token',
    audience: 'https://brides.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router, private storage: StorageService) {
    console.log('AuthService');
  }

  getToken() {
    const token: TOKEN = this.storage.api.local.get('token');
    return token.accessToken;
  }

  get isAuthenticated(): boolean {
    const token: TOKEN = this.storage.api.local.get('token');
    return token && token.expiresAt && Date.now() < token.expiresAt;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log(window.location.hash);

    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // console.log(authResult);
    // // Set the time that the access token will expire at
    // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    // localStorage.setItem('access_token', authResult.accessToken);
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', expiresAt);
    authResult.expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this.storage.api.session.save('token', authResult);
    console.log(this.storage.api.session.get('token'));
  }

  // private removeSession() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  // }
  clearSession() {
    this.storage.api.local.clear();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.clearSession();
    // Go back to the home route
    this.router.navigate(['/']);
  }
}
