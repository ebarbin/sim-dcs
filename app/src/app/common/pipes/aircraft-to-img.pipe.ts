import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aircraftToImgPipe'
})
export class AircraftToImgPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'KC135MPRS':
        return 'topdown_tanker.png';
      case 'KC-135':
        return 'topdown_tanker.png'; 
      case 'UH-1H':
        return 'topdown_heli.png';
      case 'FA-18C_hornet':
        return 'topdown_f18.png';
      case 'F-14A-135-GR':
        return 'topdown_f14.png';
    }
    return 'generic.png';
  }

}
