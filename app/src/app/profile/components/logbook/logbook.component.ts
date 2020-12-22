import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})
export class LogbookComponent implements OnInit {

  @Input() timeLineEvents;

  constructor() { }

  ngOnInit(): void {}

}
