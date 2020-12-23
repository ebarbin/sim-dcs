import { Pipe, PipeTransform } from '@angular/core';
import { faSignOutAlt, faPlaneArrival, faPlaneDeparture, faSignInAlt, faCrosshairs, faSkull, faBahai } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'eventToImgPipe'
})
export class EventToImgPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    switch (value) {
      case 'S_JOIN_MISSION':
        return faSignInAlt;
      case 'S_LEAVE_MISSION':
        return faSignOutAlt;
      case 'S_EVENT_TAKEOFF':
        return faPlaneDeparture;
      case 'S_EVENT_LAND':
        return faPlaneArrival;
      case 'S_EVENT_LAND':
        return faPlaneArrival;
      case 'S_EVENT_SHOT':
        return faCrosshairs;
      case 'S_EVENT_PILOT_DEAD':
        return faSkull;
      case 'S_EVENT_CRASH':
        return faBahai;
      case 'S_EVENT_HIT':
        return faBahai;
    }
    return null;
  }
}
