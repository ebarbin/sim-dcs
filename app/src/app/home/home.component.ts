import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  public executeSelectedChange = (event) => {}

  hideLabel = false;
  showDetail = false;

  maps = [
    {
      name: 'Caucaso', coords: {
        lat: 42.269617836087626,
        lng: 42.070769667991954,
        zoom: 9,
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeControl: true,
      }
    },
    {
      name: 'Golfo Persico', coords: {
        lat: 26.175847, 
        lng: 56.316435,
        zoom: 9,
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeControl: true,
      }
    },
  ];

  selectedMap = this.maps[0];
}
