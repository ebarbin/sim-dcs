import { Component, Input, OnInit } from '@angular/core';
import { faBullseye, faBars, faIdCard, faMap, faUserFriends, faSignOutAlt, faPlaneArrival, faPlaneDeparture, faSignInAlt, faCrosshairs } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() type;
  icon = null;

  constructor() { }

  ngOnInit(): void {
    switch (this.type) {
      case 'faSignOutAlt':
        this.icon = faSignOutAlt;
        break;
      case 'faUserFriends':
        this.icon = faUserFriends;
        break;
      case 'faMap':
        this.icon = faMap;
        break;
      case 'faIdCard':
        this.icon = faIdCard;
        break;
      case 'faBars':
        this.icon = faBars;
        break;
      case 'faBullseye':
        this.icon = faBullseye;
        break;
      case 'faPlaneArrival':
        this.icon = faPlaneArrival;
        break;
      case 'faPlaneDeparture':
        this.icon = faPlaneDeparture;
        break;
      case 'faSignInAlt':
        this.icon = faSignInAlt;
        break;
      case 'faSignInAlt':
        this.icon = faSignInAlt;
        break;
      case 'faCrosshairs':
        this.icon = faCrosshairs;
        break;
    }
  }
}
