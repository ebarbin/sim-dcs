import { Pipe, PipeTransform } from '@angular/core';
import { faBullseye, faBars, faIdCard, faMap, faUserFriends, faSignOutAlt, faPlaneArrival, faPlaneDeparture, faSignInAlt, 
  faCrosshairs, faSkull, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'iconPipe'
})
export class IconPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {   

    switch (value) {
      case 'faSignOutAlt':
        return faSignOutAlt;
      case 'faUserFriends':
        return faUserFriends;
      case 'faMap':
        return faMap;
      case 'faIdCard':
        return faIdCard;
      case 'faBars':
        return faBars;
      case 'faBullseye':
        return faBullseye;
      case 'faPlaneArrival':
        return faPlaneArrival;
      case 'faPlaneDeparture':
        return faPlaneDeparture;
      case 'faSignInAlt':
        return faSignInAlt;
      case 'faSignInAlt':
        return faSignInAlt;
      case 'faCrosshairs':
        return faCrosshairs;
      case 'faSkull':
        return faSkull;
      case 'faSyncAlt':
        return faSyncAlt;
    }

  }

}
