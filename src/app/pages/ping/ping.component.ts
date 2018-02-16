
import 'rxjs/add/operator/map';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ping',
  template: `
  `,
  styles: [`
  `]
})
export class PingComponent implements OnInit {

  API_URL = 'http://localhost:3000/api/posts';

  constructor(http: HttpClient) {
    http.get(this.API_URL)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  ngOnInit() {
  }
}
