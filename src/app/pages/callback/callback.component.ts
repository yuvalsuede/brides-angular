import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../common/services/auth0/auth.service';

@Component({
  selector: 'app-callback',
  template: `
    <div class="navbar-width">
      <div class="container-fluid">
        <p>Logging In...</p>
      </div>
    </div>
  `,
  styles: [`
  `]
})

export class CallbackComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private router: Router) {
    // Parse authentication hash
  }

  ngOnInit() {
    console.log('CallbackComponent')
    this.auth.handleAuthentication();
  }

  ngOnDestroy() {
    // this.loggedInSub.unsubscribe();
  }
}
