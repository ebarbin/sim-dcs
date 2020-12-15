import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(@Inject(DOCUMENT) private document: Document, private cookieService: CookieService, private http: HttpClient) { }

  rootURL = '/api';

  token;
  checkLogin() {
    return this.http.get(this.rootURL + '/auth/check' + this.token);
  }

  getAuthPage() {
    return this.http.get(this.rootURL + '/auth/page');
  }

  isAuthenticated() {
    let ca: Array<string> = this.document.cookie.split(';');
    this.cookieService.set('test', 'test');
console.log(this.cookieService.get('test'));
    const cookie = this.cookieService.get('discord-oauth');
    console.log(cookie);
    return cookie ? true : true;
  }

  logout() {
    this.document.location.href = '/auth/logout';
    //return this.http.get(this.rootURL + '/auth/logout');
  }
}
