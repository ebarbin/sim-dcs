import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})
export class LogbookComponent implements OnInit {

  @Input() pilot;

  pageSize = 5;
  pageEvent: PageEvent;

  datasource = [];
  timeLineEvents = [];
  
  constructor() { }

  ngOnInit(): void {

    this.timeLineEvents = [];
      
    const result = _.groupBy(this.pilot.flightEvents, this.monthName);
    for (const prop in result) {
      this.timeLineEvents.unshift({
        date: moment(prop, 'DD/MM/yyyy').toDate(), 
        events: result[prop].map(el => { el.date = moment(el.date).toDate(); return el; })
      });
    }

    this.getPaginatedData();
  }

  private monthName = fe => moment(fe.date, 'YYYY-MM-DD').format('DD/MM/yyyy');

  getPaginatedData(event?:PageEvent) {

    if (!event) this.datasource = this.timeLineEvents.slice(0, 5);
    else this.datasource = this.timeLineEvents.slice(event.pageIndex * event.pageSize, (event.pageIndex * event.pageSize) + event.pageSize);
    
    return event;
  }
}
