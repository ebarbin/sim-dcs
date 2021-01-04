import { Component, OnInit } from '@angular/core';
import { PilotsService } from '../../../common/services/pilots.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: any;
  pilot: any;

  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void { this.loadProfileData(); }

  private loadProfileData() {
    this.pilotsService.getLoggedInPilot().subscribe( (res) => {
      this.user = res.user;
      this.pilot = res.pilot;
    });
  }

  onRefresh() {
    this.loadProfileData();
  }

}
