import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-event',
  templateUrl: './mission-event.component.html',
  styleUrls: ['./mission-event.component.css']
})
export class MissionEventComponent implements OnInit {

  @Input() event;
  
  constructor() { }

  ngOnInit(): void {}

}
