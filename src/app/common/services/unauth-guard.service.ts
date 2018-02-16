import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth0/auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      console.log('!this.authService.isAuthenticated');
      this.authService.clearSession();
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
