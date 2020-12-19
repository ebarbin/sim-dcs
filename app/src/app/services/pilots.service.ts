import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PilotsService {

  constructor(private sessionService: SessionService, private http: HttpClient) { }

  rootURL = '/api';

  getPilots() {
    return this.http.get(this.rootURL + '/pilot').pipe(
      map((pilots:any) => {
        return pilots.map(pilot => {
          return pilot;
        });
      })
    );
  }

  getPilot() {
    const user = this.sessionService.getUser();
    return this.http.get(this.rootURL + '/pilot/' + user.pilot).pipe(
      map((pilot:any) => {
        return {pilot: pilot, user: user};
      })
    );
  }
}


