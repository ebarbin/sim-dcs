import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
@Pipe({
  name: 'assetsPathFixPipe'
})
export class AssetsPathFixPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let path = '../../../sim-dcs/assets/images/';
    if (!environment.production) {
      path = '../../../assets/images/';
    }
    return path + value;
  }

}
