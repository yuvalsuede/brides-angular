
import 'rxjs/add/operator/map';
import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../common/services/http.service';
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

  constructor(public http: HttpService, httpClient: HttpClient) {
    this.securedPing();
    httpClient.get(this.API_URL).subscribe(res => {
      console.log(res);
    });
  //   get(url: string, options?: any): Observable<any> {
  //     const authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5USXpOME5HTUVWRU16VkRRa1ZFTlRCQlFUSkdNVFU1TUVFeVJrSkZSRFJGUWtZeU0wSkJOZyJ9.eyJpc3MiOiJodHRwczovL2JyaWRlcy5hdXRoMC5jb20vIiwic3ViIjoiVzFReTllTmtkUklkNW9wVTZod3hrWDdhaE50aUd1aUNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYnJpZGVzLmNvLmlsIiwiaWF0IjoxNTE4MDk1NzgzLCJleHAiOjE1MTgxODIxODMsImF6cCI6IlcxUXk5ZU5rZFJJZDVvcFU2aHd4a1g3YWhOdGlHdWlDIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.yG1m6k3IAzPHZdOKaoztrUoCTj-QRimXKC0trEGXgyfVoTzXmocFlOh5_daK2WoJuwHW-cgBp6qtyMdvs50SYk45WEO15UXVadrMhwU-smPs9CfZLPOoyBeZVSob3atvZXtvL-8_f-Rn2-za8hkzPAEZZRwCy5Db-q67RqGzC5UJq3grUcNnAic_71foN6ZD2WPBwMNBKuKG2rcKGAPIQ5c1Y7wYTeKTqb9flx1sGS6Gbs7VecOcPE3_oy8uCHk2FpG_TIndwkZkx2xZesj8G8_GMf5uwowf27pV33U3mzK9Kz2lCmkfz3fyF_I27UWUdgM1j11jSjLWIO_qXnGJzQ';
  //   console.log(authorization);
  //   return this._http.get(url, {
  //     headers: new HttpHeaders().set(
  //       'Authorization', authorization
  //     )
  //   });
  // }
  }

  public securedPing(): void {
    console.log('securedPing');
    this.http.get(`${this.API_URL}`).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
  }
}
