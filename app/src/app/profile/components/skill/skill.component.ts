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

  ngOnInit(): void {}

  onExpand(skill) {
    
    this.pilotsService.getChildsSkills(skill).subscribe((childSkills:any) => {
      this.childSkills = childSkills.map((cs) => {

        if (this.pilotSkills.find((ps) => ps.skill == cs._id)) cs.requested = true;
        
        return cs;
      });
    });

  }

  onRequestSkillChange(e, cs) {

    if (e.checked) this.pilotsService.addPilotSkill(cs).subscribe();
    else this.pilotsService.removePilotSkill(cs).subscribe();

  }
}
