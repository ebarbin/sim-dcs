import { Component, Input, OnInit  } from '@angular/core';
import { PilotsService } from 'src/app/common/services/pilots.service';

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

  weight = 'normal';
  constructor() { }

  ngOnInit(): void {}

  getImageStyle () {

    let val = this.zoom;
    if (this.zoom > 14) {
      val = this.zoom * 3; 
    } else if (this.zoom <= 14 && this.zoom > 9) {
      val = this.zoom * 4;
    } else if (this.zoom <= 9) {
      val = this.zoom * 5;
    }
    
    return {
      'transform': 'rotate(' + this.marker.heading + 'deg)',
      'width' : val + 'px',
      'height' : val + 'px',
    }
  }

  onMouseOver(infoWindow, $event: MouseEvent) {
    console.log(1);
    infoWindow.open();
}

onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
}

}
