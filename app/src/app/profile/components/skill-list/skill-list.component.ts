import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { PilotsService } from 'src/app/common/services/pilots.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit, OnDestroy {

  parentSkills = [];
  pilotSkills = [];

  subs: Subscription;

  subsAddSkill: Subscription;
  subsRemoveSkill: Subscription;

  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void {

    forkJoin([
      this.pilotsService.getPilotSkills(),
      this.pilotsService.getAllSkills()    
    ]).subscribe((responses: any) => {
      this.pilotSkills = responses[0];
      this.parentSkills = responses[1];
    })

    this.subsRemoveSkill = this.pilotsService.pilotSkillRemoved.subscribe((updated: any) => {
      updated.forEach(u => this.pilotSkills = this.pilotSkills.filter(ps =>  ps._id != u._id) );
    })

    this.subsAddSkill = this.pilotsService.pilotSkillAdded.subscribe((updated: any) => {
      updated.forEach(u =>  this.pilotSkills.push(u));
    })

  }

  ngOnDestroy() {

    this.subsAddSkill.unsubscribe();
    this.subsRemoveSkill.unsubscribe();
  }

}
