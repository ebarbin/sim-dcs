import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

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

    if (this.user) return true;
    else if (environment.production) {

      const strUser = localStorage.getItem('user');
      if (strUser) {
        this.user = JSON.parse(strUser);
        return true;
      }
      return false;

    } else if (!environment.production) {

      this.user = {
        _id: "5fdaa3c7a6597323e5375a3d",
        "discordId" : "731248994159689818",
        "userName" : "emucho [Emma]",
        "email" : "emmanuel.barbin@gmail.com",
        "token" : "nUyyChibEp2xPR4l2u5IWAs4dh8kcn",
        "pilot" : "5fdcad01b297fafca8bffd58",
        "avatar" : "https://cdn.discordapp.com/avatars/731248994159689818/1f9833c075fb3d2b8e9766545b1f76ed.jpg"
      };

      return true;

    }

  }

  logout() {
    this.user = null;
    localStorage.clear();
    this.document.location.href = '/auth/logout';
  }
}
