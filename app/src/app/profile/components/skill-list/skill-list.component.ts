import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PilotsService } from 'src/app/common/services/pilots.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  parentSkills = [];
  pilotSkills = [];

  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void {

    forkJoin([
      this.pilotsService.getPilotSkills(),
      this.pilotsService.getAllSkills()    
    ]).subscribe((responses: any) => {
      this.pilotSkills = responses[0];
      this.parentSkills = responses[1];
    })

    this.pilotsService.pilotSkillChanged.subscribe(() => {
      this.pilotsService.getPilotSkills().subscribe((res:any) => {
        this.pilotSkills = res;
      });
    })
  }

}
