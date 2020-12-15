import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getPositions() {
    return this.http.get(this.rootURL + '/positions').pipe(
      map((positions:any) => {
        return positions.map(pos => {

          let icon = '../../../sim-dcs/assets/images/topdown_f18.png'; 
          if (pos.aircraftModel == 'KC135MPRS' || pos.aircraftModel == 'KC-135') icon = '../../../sim-dcs/assets/images/topdown_tanker.png'; 
          else if (pos.aircraftModel == 'UH-1H') icon = '../../../sim-dcs/assets/images/topdown_heli.png';
          
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
    );
  }
}


