import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortByPipe'
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], order: string, column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    if (order == 'asc') return orderBy(value, [column], [order]);
    else return orderBy(value, [column], ['desc']);
  }

}
