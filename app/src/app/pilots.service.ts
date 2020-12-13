import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PilotsService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getPilots() {
    return this.http.get(this.rootURL + '/pilots').pipe(
      map((pilots:any) => {
        return pilots.map(pilot => {
          return pilot;
        });
      })
    );
  }
}


