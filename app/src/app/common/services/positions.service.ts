import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, zip } from 'rxjs';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators'
import { PilotsService } from './pilots.service';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  rootURL = '/api';

  positionsChanged = new Subject<any>();

  centerChanged = new Subject<any>();

  interval: any;

  constructor(private http: HttpClient, private pilotService: PilotsService) {}

  initGetPositions() {

    this.interval = setInterval(() => {

      this.pilotService.getLoggedInPilot().pipe(
        mergeMap((profile) => this.getPositions(profile))).subscribe(data => {
          this.positionsChanged.next(data)
        });
    }, 5000);
  }

  endGetPositions() {
    if (this.interval != null) clearInterval(this.interval);
  }

  centerOn(marker) {
    this.centerChanged.next(marker);
  }

  private getPositions(profile) {
    
      return this.http.get(this.rootURL + '/positions').pipe(
        map((positions:any) => {
          return positions.map(pos => {
  
            let icon = 'topdown_f18.png';
            if (pos.aircraftModel == 'KC135MPRS' || pos.aircraftModel == 'KC-135') icon = 'topdown_tanker.png'; 
            else if (pos.aircraftModel == 'UH-1H') icon = 'topdown_heli.png';
            
            let coalition = 'blue';
            if (pos.coalitionId == 1) coalition = 'red';
  
            let isMe = profile.user.userName == pos.userName;
            /*if (profile.user.userName == pos.userName) {
              isMe = true;
              this.pilotService.setMyPosition({lat: pos.lat, lng: pos.lng, });
            }*/

            return {
              isMe: isMe,
              isHuman: pos.isHuman,
              coalition: coalition,
              lat: pos.lat, lng: pos.lng, 
              userName: pos.userName, 
              aircraftModel: pos.aircraftModel,
              heading: pos.heading,
              altitude: pos.altitude
            }
          });
        })  
      );
  }
}


