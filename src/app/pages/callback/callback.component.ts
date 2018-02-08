import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../common/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-callback',
  template: `
    <div class="loading">
      <img src="assets/loading.svg" alt="loading">
    </div>
  `,
  styles: [`
  `]
})

export class CallbackComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    // Parse authentication hash
    auth.handleAuthentication();
  }


  ngOnInit() {
    // this.loggedInSub = this.auth.loggedIn$.subscribe(
    //   loggedIn => loggedIn ? this.router.navigate(['/home']) : null
    // );
  }
  ngOnDestroy() {
    // this.loggedInSub.unsubscribe();
  }
}
