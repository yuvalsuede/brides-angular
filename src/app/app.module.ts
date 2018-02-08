import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AuthService, TOKEN} from './common/services/auth.service';
import {EmptyComponent} from './empty.component';
import {HomeComponent} from './pages/home/home.component';
import {CallbackComponent} from './pages/callback/callback.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {StorageService} from './common/services/storage.service';
import {PingComponent} from './pages/ping/ping.component';
import {HttpService} from './common/services/http.service';

export function jwtOptionsFactory(storage: StorageService) {
  console.log(localStorage.getItem('access_token'));
  return {
    tokenGetter: () => {
      const token = {
        accessToken: localStorage.getItem('access_token'),
        idToken: localStorage.getItem('idToken'),
        expiresAt: localStorage.getItem('expiresAt')
      };
      return token;
    },
    whitelistedDomains: ['localhost:3000']
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,

    EmptyComponent,
    HomeComponent,
    PingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [
          StorageService
        ]
      }
    })
  ],
  providers: [
    StorageService,
    AuthService,
    HttpService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
