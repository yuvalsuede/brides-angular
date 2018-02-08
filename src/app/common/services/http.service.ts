import {StorageService} from './storage.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient,
              private _router: Router,
              private _storage: StorageService) {
  }

  get(url: string, options?: any): Observable<any> {
    const authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5USXpOME5HTUVWRU16VkRRa1ZFTlRCQlFUSkdNVFU1TUVFeVJrSkZSRFJGUWtZeU0wSkJOZyJ9.eyJpc3MiOiJodHRwczovL2JyaWRlcy5hdXRoMC5jb20vIiwic3ViIjoiVzFReTllTmtkUklkNW9wVTZod3hrWDdhaE50aUd1aUNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYnJpZGVzLmNvLmlsIiwiaWF0IjoxNTE4MDk1NzgzLCJleHAiOjE1MTgxODIxODMsImF6cCI6IlcxUXk5ZU5rZFJJZDVvcFU2aHd4a1g3YWhOdGlHdWlDIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.yG1m6k3IAzPHZdOKaoztrUoCTj-QRimXKC0trEGXgyfVoTzXmocFlOh5_daK2WoJuwHW-cgBp6qtyMdvs50SYk45WEO15UXVadrMhwU-smPs9CfZLPOoyBeZVSob3atvZXtvL-8_f-Rn2-za8hkzPAEZZRwCy5Db-q67RqGzC5UJq3grUcNnAic_71foN6ZD2WPBwMNBKuKG2rcKGAPIQ5c1Y7wYTeKTqb9flx1sGS6Gbs7VecOcPE3_oy8uCHk2FpG_TIndwkZkx2xZesj8G8_GMf5uwowf27pV33U3mzK9Kz2lCmkfz3fyF_I27UWUdgM1j11jSjLWIO_qXnGJzQ';
    console.log(authorization);
    return this._http.get(url, {
      headers: new HttpHeaders().set(
        'Authorization', authorization
      )
    });
  }

  post(url: string, data?: any, options?: any): Observable<any> {
    const body = JSON.stringify(data);

    return this.handleResponse(this._http.post(url, body, this.getRequestOptions(options)));
  }

  put(url: string, data: any, options?: any): Observable<any> {
    const body = JSON.stringify(data);

    return this.handleResponse(this._http.put(url, body, options));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.handleResponse(this._http.delete(url, options));
  }

  getRequestOptions(options: any) {
    options = options || {};
    const authorization = `Bearer ${localStorage.getItem('access_token')}`;

    if (options.headers) {
      options.headers = options.headers.append('Content-Type', 'application/json');
      options.headers.set('Authorization', authorization )

    } else {
      options.headers = new HttpHeaders();
      options.headers = options.headers.append('Content-Type', 'application/json');
      options.headers.set('Authorization', authorization )

    }

    console.log(authorization);

    options.headers.set('Authorization', authorization )
    console.log(options.headers);
    console.log(options);
    return options;
  }

  handleResponse(observable: Observable<any>): Observable<any> {
    return observable.catch((err, source) => {
      console.log(err);
      if (err.status === 401) {
        this._storage.api.local.clear();
        this._router.navigate(['/home']);
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    }).finally(() => {

    });
  }


  extractData(response: any) {
    if (response && !response['success']) {
      const errorMessage = response['error'] ? response['error'][0] : response['result']['error'];
    }
    return response || {};
  }

  handleError(error: any) {
    const errMsg = JSON.parse(error._body).errorMessage || JSON.parse(error._body).error || error.json().error_description || 'Server error';
    return Observable.throw(errMsg);
  }
}
