import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators'
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class PilotsService {

  myPosition;

  private pilotsObs: Observable<[any]>;

  pilotSkillAdded = new Subject();
  pilotSkillRemoved = new Subject();

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
      const user = this.sessionService.getUser();
      return this.http.get(this.rootURL + '/pilot/' + user.pilot).pipe(
        map((pilot:any) => {
          return {pilot: pilot, user: user};
        })
      );
  }

  getPilotSkills() {
    const user = this.sessionService.getUser();
    return this.http.get(this.rootURL + '/pilot/' + user.pilot + '/skill');
  }

  getMyPosition() {
    return this.myPosition;
  }
  
  getAllSkills() {
    return this.http.get(this.rootURL + '/skill');
  }

  getChildsSkills(parentSkill) {
    return this.http.get(this.rootURL + '/skill/?parent=' + parentSkill._id);
  }

  addPilotSkill(skill) {
    const user = this.sessionService.getUser();
    return this.http.post(this.rootURL + '/pilot/' + user.pilot + '/skill', {skill: skill._id, status: 'requested'}).pipe(
      tap(ps => this.pilotSkillAdded.next([ps]))
    )
  }

  addPilotAllSkills(skill) {
    const user = this.sessionService.getUser();
    return this.http.post(this.rootURL + '/pilot/' + user.pilot + '/skill/all', {skill: skill._id, status: 'requested'}).pipe(
      tap(updated => this.pilotSkillAdded.next(updated))
    )
  }

  removePilotSkill(skill) {
    const user = this.sessionService.getUser();
    return this.http.delete(this.rootURL + '/pilot/' + user.pilot + '/skill/' + skill._id).pipe(
      tap(ps => this.pilotSkillRemoved.next([ps]))
    )
  }

  removePilotAllSkills(skill) {
    const user = this.sessionService.getUser();
    return this.http.delete(this.rootURL + '/pilot/' + user.pilot + '/skill/' + skill._id + '/all').pipe(
      tap(updated => this.pilotSkillRemoved.next(updated))
    )
  }

  setMyPosition(pos) {
    this.myPosition = pos;
  }

}


