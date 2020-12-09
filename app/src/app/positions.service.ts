import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket';

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

          let icon = '../../../assets/images/topdown_f18.png'; 
          if (pos.airCraftModel == 'KC135MPRS' || pos.airCraftModel == 'KC-135') icon = '../../../assets/images/topdown_tanker.png'; 
          if (pos.airCraftModel == 'UH-1H') icon = '../../../assets/images/topdown_heli.png';
          
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
            airCraftModel: pos.airCraftModel
          }
        });
      })
    );
  }
}


