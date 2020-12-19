import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-map',
  templateUrl: './wrapper-map.component.html',
  styleUrls: ['./wrapper-map.component.css']
})
export class WrapperMapComponent implements OnInit {

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
