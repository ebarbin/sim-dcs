import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  rootURL = '/api';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  createMission(mission) {
    const user = this.sessionService.getUser();
    mission.userId = user._id;
    return this.http.post(this.rootURL + '/missions/create', mission);
  }
}
