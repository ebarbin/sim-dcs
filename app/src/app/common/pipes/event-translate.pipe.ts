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
        return 'Ha aterrizaje';
      case 'S_EVENT_SHOT':
        return 'Ha disparado';
    }
    return value + ' (missing mapping)';
  }

}
