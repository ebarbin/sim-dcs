import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { FlightStatsService } from 'src/app/common/services/flight-stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {

  data = { length: null, datasource: null};
  
  pageSize = 2;
  pageEvent: PageEvent;

  subs: Subscription;

  constructor(private flightStatsService: FlightStatsService) { }

  ngOnInit(): void { 

    this.getPaginatedData();

    this.subs = this.flightStatsService.flightStatsRefresh.subscribe(() => {
      this.getPaginatedData();
    })
  }

  getPaginatedData(event?:PageEvent) {

    let pageIndex = event ? event.pageIndex : 0;
    
    this.flightStatsService.getFlightStatsFromPilot(pageIndex, this.pageSize).subscribe((response:any) => {
      this.data.length = response.length;
      this.data.datasource = response.datasource;
    });
    
    return event;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
