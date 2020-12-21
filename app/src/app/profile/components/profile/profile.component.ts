import { Component, OnInit, ViewChild } from '@angular/core';
import { PilotsService } from '../../../common/services/pilots.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  profile;
  timeLineEvents = [];

  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void {

    this.pilotsService.getLoggedInPilot().subscribe( (res) => {

      const monthName = fe => moment(fe.date, 'YYYY-MM-DD').format('DD/MM/yyyy');
      const result = _.groupBy(res.pilot.flightEvents, monthName);
      for (const prop in result) {
        this.timeLineEvents.unshift({date: moment(prop, 'DD/MM/yyyy').toDate(), events: result[prop]});
    }
      this.profile = res;
    })
  }

}
