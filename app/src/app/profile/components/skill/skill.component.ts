import { Component, Input, OnInit } from '@angular/core';
import { PilotsService } from 'src/app/common/services/pilots.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() skill;
  @Input() pilotSkills;

  childSkills = [];
  
  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void {
    this.skill.requested = this.pilotSkills.find(ps => ps.skill == this.skill._id) ? true : false;
  }

  onExpand(skill) {
    
    this.pilotsService.getChildsSkills(skill).subscribe((data:any) => {

      this.childSkills = data.map((cs) => {

        if (this.pilotSkills.find((ps) => ps.skill == cs._id)) cs.requested = true;
        else cs.requested = false;

        if (this.skill._id == cs._id && cs.requested) this.skill.requested = true;
        
        return cs;
      });
    });

  }

  onRequestSkillChange(e, cs) {
    cs.requested = e.checked;
    if (e.checked) {

      this.pilotsService.addPilotSkill(cs).subscribe(() => {
        if (!this.childSkills.find((cs) => cs.requested == false)) this.pilotsService.addPilotSkill(this.skill).subscribe(() => this.skill.requested = true);
      });

    } else {
      this.pilotsService.removePilotSkill(cs).subscribe(() => {
        if (this.skill.requested) this.pilotsService.removePilotSkill(this.skill).subscribe(() => this.skill.requested = false);
      });
    }

  }

  onRemoveAll() {
    this.pilotsService.removePilotAllSkills(this.skill).subscribe(() => {
      this.childSkills.forEach(cs => cs.requested = false);
      this.skill.requested = false;
    });
  }

  onSelectAll() {
    this.pilotsService.addPilotAllSkills(this.skill).subscribe(() => {
      this.childSkills.forEach(cs => cs.requested = true);
      this.skill.requested = true;
    });
  }
}
