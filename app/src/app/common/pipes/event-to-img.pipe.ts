import { Pipe, PipeTransform } from '@angular/core';
import { faBullseye, faBars, faIdCard, faMap, faUserFriends, faSignOutAlt, faPlaneArrival, faPlaneDeparture, faSignInAlt, 
  faCrosshairs, faSkull } from '@fortawesome/free-solid-svg-icons';

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
    }
    return null;
  }
}
