import { Component, Input, OnInit } from '@angular/core';
import { PositionsService } from 'src/app/positions.service';

@Component({
  selector: 'app-dcs-map-marker',
  templateUrl: './dcs-map-marker.component.html',
  styleUrls: ['./dcs-map-marker.component.css']
})
export class DcsMapMarkerComponent implements OnInit {

  @Input() marker;
  @Input() zoom;
  @Input() hideLabel;
  @Input() showDetail;
  
  constructor() { }

  ngOnInit(): void {}

  getImageStyle () {
    let val = this.zoom;
    if (this.zoom > 14) {
      val = this.zoom + 7; 
    } else if (this.zoom <= 14 && this.zoom > 9) {
      val = this.zoom + 20;
    } else if (this.zoom <= 9) {
      val = this.zoom + 25;
    }
    
    return {
      'transform': 'rotate(' + this.marker.heading + 'deg)',
      'width' : val + 'px',
      'height' : val + 'px',
    }
  }

}
