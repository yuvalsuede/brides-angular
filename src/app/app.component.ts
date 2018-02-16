import {Component, OnInit} from '@angular/core';
import {AuthService} from './common/services/auth0/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Auth0 - Angular</a>

          <button
            class="btn btn-primary btn-margin"
            routerLink="/">
            Home
          </button>

          <button
            class="btn btn-primary btn-margin"
            *ngIf="!auth.isAuthenticated()"
            (click)="auth.login()">
            Log In
          </button>

          <button
            class="btn btn-primary btn-margin"
            *ngIf="auth.isAuthenticated()"
            (click)="auth.logout()">
            Log Out
          </button>

        </div>
      </div>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>  `,
  styles: [`
  `]
})

export class AppComponent implements OnInit {

  constructor(public auth: AuthService) {

  }

  ngOnInit() {
  }
}
