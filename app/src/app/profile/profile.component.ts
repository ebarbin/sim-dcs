import { Component, OnInit } from '@angular/core';
import { PilotsService } from '../services/pilots.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;
  constructor(private pilotsService: PilotsService) { }

  ngOnInit(): void {
    this.pilotsService.getPilot().subscribe( (res) => {
      console.log(res);
      this.profile = {
        user: res.user
      };
    })
  }

}
