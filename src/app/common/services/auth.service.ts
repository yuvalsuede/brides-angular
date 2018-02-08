import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface TOKEN {
  accessToken: string;
  idToken: string;
  expiresAt: number;
}

export const AUTH_CONFIG: any = {
  CLIENT_ID: 'AvdNt5Ya1svn2dIngC4lTMWL11noj1By',
  CLIENT_DOMAIN: 'brides.auth0.com',
  AUDIENCE: 'https://brides.auth0.com/userinfo',
  CALLBACK_URL: 'http://localhost:4200/callback',
  RESPONSE_TYPE: 'token id_token'
};

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: AUTH_CONFIG.RESPONSE_TYPE,
    audience: AUTH_CONFIG.AUDIENCE,
    redirectUri: AUTH_CONFIG.CALLBACK_URL,
    scope: 'openid profile'
  });

  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);


  constructor(public router: Router) {

    if (this.isAuthenticated()) {
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
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
    console.log(authResult);
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    console.log(localStorage.getItem('access_token'))
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.setLoggedIn(true);

  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.setLoggedIn(false);

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
