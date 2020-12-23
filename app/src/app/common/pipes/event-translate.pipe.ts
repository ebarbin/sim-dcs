import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTranslate'
})
export class EventTranslatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'S_JOIN_MISSION':
        return 'Ha ingresado';
      case 'S_LEAVE_MISSION':
        return 'Ha salido';
      case 'S_EVENT_TAKEOFF':
        return 'Ha despegado';
      case 'S_EVENT_LAND':
        return 'Ha aterrizado';
      case 'S_EVENT_SHOT':
        return 'Ha disparado';
      case 'S_EVENT_HIT':
        return 'Ha impactado';
      case 'S_EVENT_PILOT_DEAD':
        return 'Ha muerto';
      case 'S_EVENT_CRASH':
        return 'Ha destruido la aeronave';
    }
    return value + ' (missing mapping)';
  }

}
