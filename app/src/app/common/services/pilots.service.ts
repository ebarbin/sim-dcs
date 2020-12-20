import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators'
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class PilotsService {

  myPosition;

  private pilotObs: Observable<any>;
  private pilotsObs: Observable<[any]>;

  constructor(private sessionService: SessionService, private http: HttpClient) { }

  rootURL = '/api';

  getPilots() {
    if (!this.pilotsObs) {
      this.pilotsObs = this.http.get(this.rootURL + '/pilot').pipe(
        map((pilots:any) => {
          return pilots.map(pilot => {
            return pilot;
          });
        }),
        shareReplay()
      );
    }

    return this.pilotsObs;
  }

  getLoggedInPilot() {
    if (!this.pilotObs) {
      const user = this.sessionService.getUser();
      this.pilotObs = this.http.get(this.rootURL + '/pilot/' + user.pilot).pipe(
        map((pilot:any) => {
          return {pilot: pilot, user: user};
        }),
        shareReplay()
      );
    }

    return this.pilotObs;
  }

  getMyPosition() {
    return this.myPosition;
  }
  
  setMyPosition(pos) {
    this.myPosition = pos;
  }

}


