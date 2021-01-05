import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { FlightEventsService } from 'src/app/common/services/flight-events.service';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})
export class LogbookComponent implements OnInit, OnDestroy {

  pageSize = 5;
  pageEvent: PageEvent;

  data = { length: null, datasource: null};
  
  subs: Subscription;
  
  constructor(private flightEventsService: FlightEventsService) { }

  ngOnInit(): void {
      
    this.getPaginatedData();

    this.subs = this.flightEventsService.flightEventRefresh.subscribe(() => {
      this.getPaginatedData();
    })

  }

  getPaginatedData(event?:PageEvent) {

    let pageIndex = event ? event.pageIndex : 0;
    
    this.flightEventsService.getFlightEventsFromPilot(pageIndex, this.pageSize).subscribe((response:any) => {
      this.data.length = response.length;
      this.data.datasource = response.datasource;
    });
    
    return event;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
