import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  rootURL = '/api';

  positionsChanged = new Subject<any>();

  interval: any;

  constructor(private http: HttpClient) {}

  initGetPositions() {
    this.interval = setInterval(() => this.getPositions(), 5000);
  }

  endGetPositions() {
    if (this.interval != null) clearInterval(this.interval);
  }

  private getPositions() {
    this.http.get(this.rootURL + '/positions').pipe(
      map((positions:any) => {
        return positions.map(pos => {

          let icon = 'topdown_f18.png'; 
          if (pos.aircraftModel == 'KC135MPRS' || pos.aircraftModel == 'KC-135') icon = 'topdown_tanker.png'; 
          else if (pos.aircraftModel == 'UH-1H') icon = 'topdown_heli.png';
          
          let coalition = 'blue';
          if (pos.coalitionId == 1) coalition = 'red';

          return {
            isHuman: pos.isHuman,
            coalition: coalition,
            lat: pos.lat, lng: pos.lng, 
            userName: pos.userName, 
            icon: icon,
            heading: pos.heading,
            altitude: pos.altitude,
            aircraftModel: pos.aircraftModel
          }
        });
      })
    ).subscribe((positions:any) => {
      this.positionsChanged.next(positions);
    });
  }
}


