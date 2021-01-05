import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FlightStatsService {

  rootURL = '/api/flight-stat';

  flightStatsRefresh = new Subject();

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getFlightStatsFromPilot(page, limit) {
    const user = this.sessionService.getUser();
    return this.http.get(this.rootURL + '/' + user.pilot +'/?page='+page+'&limit='+limit);
  }
}
