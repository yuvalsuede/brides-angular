import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppContext {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
}
