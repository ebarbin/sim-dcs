import { Component, OnInit } from '@angular/core';
import { FlightEventsService } from 'src/app/common/services/flight-events.service';
import { FlightStatsService } from 'src/app/common/services/flight-stats.service';
import { SessionService } from 'src/app/common/services/session.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: any;
  pilot: any;

  constructor(private sessionService: SessionService, private flightEventsService: FlightEventsService, private flightStatsService: FlightStatsService) { }

  ngOnInit(): void { 
    this.user = this.sessionService.getUser();
  }

  onRefresh() {
    this.flightEventsService.flightEventRefresh.next();
    this.flightStatsService.flightStatsRefresh.next();
  }

}
