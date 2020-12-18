import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

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
