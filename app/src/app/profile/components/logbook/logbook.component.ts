import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})
export class LogbookComponent implements OnInit {

  pageSize = 5;
  pageEvent: PageEvent;

  datasource = [];
  
  @Input() timeLineEvents;

  constructor() { }

  ngOnInit(): void {
    this.getPaginatedData();
  }

  getPaginatedData(event?:PageEvent) {

    if (!event) this.datasource = this.timeLineEvents.slice(0, 5);
    else this.datasource = this.timeLineEvents.slice(event.pageIndex * event.pageSize, (event.pageIndex * event.pageSize) + event.pageSize);
    
    return event;
  }
}
