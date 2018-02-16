import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth0/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-default mat-elevation-z2">
      <div class="nav-content">
      </div>
    </nav>
  `,
  styles: [`
    nav {
      width: 100%;
      height: 60px;
      display: block;
    }
  `]
})

export class HeaderComponent implements OnInit {
  _profile: any;
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth._userProfile) {
      this._profile = this.auth._userProfile;
      console.log(this._profile);

    } else {
      this.auth.getProfile((err, profile) => {
        this._profile = profile;
        console.log(this._profile);

      });
    }
  }
}
