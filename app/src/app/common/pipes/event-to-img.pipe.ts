import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventToImgPipe'
})
export class EventToImgPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (value) {
      case 'S_JOIN_MISSION':
        return 'faSignInAlt';
      case 'S_LEAVE_MISSION':
        return 'faSignOutAlt';
      case 'S_EVENT_TAKEOFF':
        return 'faPlaneDeparture';
      case 'S_EVENT_LAND':
        return 'faPlaneArrival';
      case 'S_EVENT_LAND':
        return 'faPlaneArrival';
      case 'S_EVENT_SHOT':
        return 'faCrosshairs';
    }
    return null;
  }
}
