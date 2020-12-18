import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetsPipe'
})
export class AssetsPipe implements PipeTransform {

  //path = '../../../sim-dcs/assets/images/';
  path = '../../../assets/images/';

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.path + value;
  }

}
