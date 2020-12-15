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

  user;

  getUser() {
    return this.user;
  }
  
  isAuthenticated() {
    const strUser = localStorage.getItem('user');
    if (strUser) {
      this.user = JSON.parse(strUser);
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    localStorage.clear();
    this.document.location.href = '/auth/logout';
  }
}
