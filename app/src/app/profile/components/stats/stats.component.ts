import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input() stats;
  
  pageSize = 2;

  pageEvent: PageEvent;

  datasource = [];

  constructor() { }

  ngOnInit(): void { this.getPaginatedData(); }

  getPaginatedData(event?:PageEvent) {

    if (!event) this.datasource = this.stats.slice(0, 2);
    else this.datasource = this.stats.slice(event.pageIndex * event.pageSize, (event.pageIndex * event.pageSize) + event.pageSize);
    
    return event;
  }

}
