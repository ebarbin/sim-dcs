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
    return this.http.post(this.rootURL + '/mission', mission);
  }

  checkDate(value) {
    return this.http.post(this.rootURL + '/mission/check-date', {date: value});
  }

  getMyMissions() {
    const user = this.sessionService.getUser();
    return this.http.get(this.rootURL + '/mission/' + user._id);
  }

  removeMission(mission) {
    return this.http.delete(this.rootURL + '/mission/' + mission._id);
  }

  updateMission(mission) {
    return this.http.put(this.rootURL + '/mission/' + mission._id, mission);
  }
}
