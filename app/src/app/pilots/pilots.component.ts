import { Component, OnInit } from '@angular/core';
import { PilotsService } from '../common/services/pilots.service';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.css']
})
export class PilotsComponent implements OnInit {

  displayedColumns: string[] = ['userName'];

  constructor(private pilotsService: PilotsService) { }

  pilots = [];

  ngOnInit(): void {
    this.pilotsService.getPilots().subscribe(pilots => {
      this.pilots = pilots;
    })
  }

}
