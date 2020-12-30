import { Component, OnInit } from '@angular/core';
import { MissionsService } from 'src/app/common/services/missions.service';

@Component({
  selector: 'app-my-mission-list',
  templateUrl: './my-mission-list.component.html',
  styleUrls: ['./my-mission-list.component.css']
})
export class MyMissionListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'publish', 'actions'];

  missions = [];

  constructor(private missionsService: MissionsService) { }

  ngOnInit(): void {
    this.missions = [];
    this.missionsService.getMyMissions().subscribe((missions:any) => this.missions = missions);
  }

}
