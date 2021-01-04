import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats = [];
  @Input() pilot;
  
  pageSize = 2;
  pageEvent: PageEvent;

  datasource = [];

  constructor() { }

  ngOnInit(): void { 

    const totStat = {
      aircraftModel:'Totales',
      flightTime: 0, takeOffs: 0, landings: 0,
      deads: 0, crashs: 0, ejects: 0
    };

    this.stats = [...this.pilot.stats];
    
    this.stats.forEach(st => {
      totStat.flightTime += st.flightTime;
      totStat.takeOffs += st.takeOffs;
      totStat.landings += st.landings;
      totStat.deads += st.deads;
      totStat.crashs += st.crashs;
      totStat.ejects += st.ejects;
    });

    this.stats.unshift(totStat);

    this.getPaginatedData(); 
  }

  getPaginatedData(event?:PageEvent) {

    if (!event) this.datasource = this.stats.slice(0, 2);
    else this.datasource = this.stats.slice(event.pageIndex * event.pageSize, (event.pageIndex * event.pageSize) + event.pageSize);
    
    return event;
  }

}
