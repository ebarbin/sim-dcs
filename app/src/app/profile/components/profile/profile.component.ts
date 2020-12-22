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
  
  user;
  stats = [];
  timeLineEvents = [];

  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void {

    this.pilotsService.getLoggedInPilot().subscribe( (res) => {
      this.user = res.user;

      const monthName = fe => moment(fe.date, 'YYYY-MM-DD').format('DD/MM/yyyy');
      const result = _.groupBy(res.pilot.flightEvents, monthName);
      for (const prop in result) {
        this.timeLineEvents.unshift({
          date: moment(prop, 'DD/MM/yyyy').toDate(), 
          events: result[prop].map(el => { el.date = moment(el.date).toDate(); return el; })
        });
      }

      const totStat = {
        aircraftModel:'Totales',
        flightTime: 0, takeOffs: 0, landings: 0,
        deads: 0, crashs: 0, ejects: 0
      };

      this.stats = res.pilot.stats;
      this.stats.forEach(st => {
        totStat.flightTime += st.flightTime;
        totStat.takeOffs += st.takeOffs;
        totStat.landings += st.landings;
        totStat.deads += st.deads;
        totStat.crashs += st.crashs;
        totStat.ejects += st.ejects;
      });

      this.stats.unshift(totStat);
      
    })
  }

}
